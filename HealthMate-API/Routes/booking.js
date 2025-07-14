import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

/**
 * @swagger
 * /api/v1/bookings/checkout-session/{doctorId}:
 *   post:
 *     summary: Create a payment session for an appointment
 *     tags: [Booking]
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
 *               timeSlots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     startingTime:
 *                       type: string
 *                       example: "09:00"
 *                     endingTime:
 *                       type: string
 *                       example: "10:00"
 *     responses:
 *       200:
 *         description: Payment session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully paid"
 *                 session:
 *                   type: object
 *                   description: Stripe checkout session details
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Time slots are required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Authorization denied"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error creating checkout session"
 *     security:
 *       - bearerAuth: []
 */

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
