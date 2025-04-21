const Notification = require('../models/notificationModel');

// ==============================
// 1. Send Notification
// ==============================
const sendNotification = async (req, res) => {
  try {
    const { userId, businessId, title, message, type } = req.body;

    // Validation
    if (!userId && !businessId) {
      return res.status(400).json({ message: 'UserId or BusinessId is required' });
    }

    const newNotification = new Notification({
      userId,
      businessId,
      title,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification sent successfully', newNotification });

  } catch (error) {
    res.status(500).json({ message: `Error in sendNotification: ${error.message}` });
  }
};

// ==============================
// 2. Get Notifications for User or Business
// ==============================
const getNotifications = async (req, res) => {
  try {
    const { userId, businessId } = req.query;

    // Ensure at least one ID is provided
    if (!userId && !businessId) {
      return res.status(400).json({ message: 'UserId or BusinessId is required' });
    }

    const filter = {};
    if (userId) filter.userId = userId;
    if (businessId) filter.businessId = businessId;

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ notifications });

  } catch (error) {
    res.status(500).json({ message: `Error in getNotifications: ${error.message}` });
  }
};

// ==============================
// 3. Mark Notification as Read
// ==============================
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });

  } catch (error) {
    res.status(500).json({ message: `Error in markNotificationAsRead: ${error.message}` });
  }
};

// ==============================
// 4. Delete Notification
// ==============================
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: `Error in deleteNotification: ${error.message}` });
  }
};

// ==============================
// 5. Delete All Notifications
// ==============================
const deleteAllNotifications = async (req, res) => {
  try {
    const { userId, businessId } = req.query;

    if (!userId && !businessId) {
      return res.status(400).json({ message: 'UserId or BusinessId is required' });
    }

    const filter = {};
    if (userId) filter.userId = userId;
    if (businessId) filter.businessId = businessId;

    await Notification.deleteMany(filter);
    res.status(200).json({ message: 'All notifications deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: `Error in deleteAllNotifications: ${error.message}` });
  }
};

module.exports = {
  sendNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
};

/*
```
✅ Explanation of Functions
Send Notification:

Sends a notification to either a user or a business.

Requires userId or businessId, along with a title, message, and notification type.

Get Notifications:

Fetches notifications using either userId or businessId.

Returns notifications in reverse chronological order using .sort({ createdAt: -1 }).

Mark Notification as Read:

Marks a specific notification as read using its notificationId.

Delete Notification:

Deletes a single notification using its notificationId.

Delete All Notifications:

Deletes all notifications related to a particular userId or businessId.
```*/