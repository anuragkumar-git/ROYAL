const ReportedDeal = require('../models/reportedDeals');
const Deal = require('../models/dealModel');

/**
 * @desc Report a deal
 * @route POST /api/reported-deals
 * @access User (Authenticated)
 */
const reportDeal = async (req, res) => {
  try {
    const reportedBy = req.user._id
    const { dealId, reason } = req.body;

    // Check if deal exists
    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    // Prevent duplicate reports from the same user
    const existingReport = await ReportedDeal.findOne({ dealId, reportedBy });
    if (existingReport) {
      return res.status(400).json({ message: 'You have already reported this deal' });
    }

    // Create a new report
    const newReport = new ReportedDeal({
      dealId,
      reportedBy,
      reason
    });

    await newReport.save();

    // Update `isReported` flag in the Deal collection
    await Deal.findByIdAndUpdate(dealId, { isReported: true });

    console.log(`Deal ${dealId} reported by user ${userId}`);
    res.status(201).json({ success: true, message: 'Deal reported successfully' });
  } catch (error) {
    console.error('reportDeal:', error);
    res.status(500).json({ success: false, message: 'Error reporting deal', error: error.message });
  }
};

/**
 * @desc Get all reported deals
 * @route GET /api/reported-deals
 * @access Admin
 */
const getAllReportedDeals = async (req, res) => {
  try {
    const reportedDeals = await ReportedDeal.find().populate('dealId').populate('reportedBy', 'name email')

    res.status(200).json(reportedDeals);
  } catch (error) {
    res.status(500).json({ message: `Error fetching reported deals: ${error.message}` });
  }
};

/**
 * @desc Delete a reported deal (Admin can remove the report)
 * @route DELETE /api/reported-deals/:id
 * @access Admin
 */
const deleteReportedDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ReportedDeal.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Remove report
    await ReportedDeal.findByIdAndDelete(id);

    // Check if there are any reports left for this deal
    const remainingReports = await ReportedDeal.findOne({ dealId: report.dealId });
    if (!remainingReports) {
      await Deal.findByIdAndUpdate(report.dealId, { isReported: false });
    }

    res.status(200).json({ message: 'Reported deal removed successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting reported deal: ${error.message}` });
  }
};

module.exports = { reportDeal, getAllReportedDeals, deleteReportedDeal };
