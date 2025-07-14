import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

/**
 * @swagger
 * /doctors/{doctorId}/reviews:
 *   get:
 *     summary: Get all reviews of a doctor
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               reviewText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review created successfully
 *     security:
 *       - bearerAuth: []
 */

const router = express.Router({ mergeParams: true });

// Define routes for the review resource.
router
  .route("/") // This is the endpoint for GET and POST.
  .get(getAllReviews) // Get all reviews of a doctor.
  .post(authenticate, restrict(["patient"]), createReview); // Create a new review.

export default router;
