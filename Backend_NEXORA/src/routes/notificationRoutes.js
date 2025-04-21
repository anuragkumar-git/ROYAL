const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications
} = require('../controllers/notificationController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');


// ==============================
// 1. Send Notification (Admin Only)
// ==============================
router.post(
  '/',
  authenticateUser,
  authorizeRole(['admin']),
  sendNotification
);

// ==============================
// 2. Get Notifications (For Users or Businesses)
// ==============================
router.get(
  '/',
  authenticateUser,
  getNotifications
);

// ==============================
// 3. Mark Notification as Read
// ==============================
router.put(
  '/:notificationId/read',
  authenticateUser,
  markNotificationAsRead
);

// ==============================
// 4. Delete Notification
// ==============================
router.delete(
  '/:notificationId',
  authenticateUser,
  deleteNotification
);

// ==============================
// 5. Delete All Notifications
// ==============================
router.delete(
  '/',
  authenticateUser,
  deleteAllNotifications
);

module.exports = router;

/*```
✅ Explanation of Notification Routes
POST /notifications/ —

Allows admins to send notifications using the sendNotification function.

authenticateUser ensures the user is authenticated.

authorizeRole ensures only admins can send notifications.

GET /notifications/ —

Fetch notifications for a user or business using the getNotifications function.

Requires either userId or businessId as a query parameter.

PUT /notifications/:notificationId/read —

Marks a notification as read using its notificationId.

Only authenticated users can perform this action.

DELETE /notifications/:notificationId —

Deletes a single notification by its notificationId.

Ensures only the relevant user or business owner can delete it.

DELETE /notifications/ —

Deletes all notifications associated with a particular userId or businessId.
```*/