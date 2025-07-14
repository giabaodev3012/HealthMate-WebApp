import express from "express"; // Import the Express library to create a router
import {
  updateUser,
  deleteUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js"; // Import controllers handling user-related logic.

import { authenticate, restrict } from "../auth/verifyToken.js"; // Import authentication and authorization middleware.

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Update successful
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion successful
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 *
 * /users/profile/me:
 *   get:
 *     summary: Get the current user's profile information
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profile information
 *     security:
 *       - bearerAuth: []
 *
 * /users/appointments/my-appointments:
 *   get:
 *     summary: Get a list of the user's appointments
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of appointments
 *     security:
 *       - bearerAuth: []
 */

const router = express.Router(); // Create a new Express router.

// Route to update user information by ID (for "patient").
router.put("/:id", authenticate, restrict(["patient"]), updateUser);

// Route to delete user by ID (for "patient").
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

// Route to get the current user's profile information (for "patient").
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);

// Route to get a list of the user's appointments (for "patient").
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router; // Export the router to use in other files.
