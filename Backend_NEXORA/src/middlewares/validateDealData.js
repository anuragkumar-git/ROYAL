// middlewares/validateDealData.js

const validateDealData = (req, res, next) => {
    let { title, description, startDate, endDate, discountPercentage, originalPrice  } = req.body;    
    try {
       // Check if required fields are present
    if (!title || !description || !startDate || !endDate) {
      // console.log(req.body);
      
      return res.status(400).json({ message: `Missing required fields` });
    }
  
    discountPercentage = Number(discountPercentage);
    originalPrice = Number(originalPrice);    
    // Validate data types
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ message: "Title and Description must be strings" });
    }
  
    if (typeof originalPrice !== 'number' || originalPrice <= 0) {
      return res.status(400).json({ message: "Original Price must be a positive number" });
    }

    // if (typeof discountedPrice !== 'number' || discountedPrice <= 0) {
    //   return res.status(400).json({ message: "Discounted Price must be a positive number" });
    // }
  
    if (typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({ message: "Discount Percentage must be a number between 0 and 100" });
    }
  
    // if (typeof isActive !== 'boolean') {
    //   return res.status(400).json({ message: "isActive must be a boolean (true or false)" });
    // }
  
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid startDate or endDate format" });
    }
  
    if (start >= end) {
      return res.status(400).json({ message: "startDate must be earlier than endDate" });
    }
  
    next(); // Proceed to the next middleware or controller if all checks pass
    } catch (error) {
      
      console.log("validateDealData:",error);
      const validationError = error
      res.status(500).json({
        message:`Deal validation Failed! ${error.message}`,
        validationError
      })
    }
   
  };
  
  module.exports = {validateDealData};
  