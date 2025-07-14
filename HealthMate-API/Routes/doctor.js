import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management APIs
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get a list of all doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search keyword (name or specialty)
 *     responses:
 *       200:
 *         description: List of doctors
 *       404:
 *         description: No doctors found
 */
router.get("/", getAllDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get details of a single doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details
 *       404:
 *         description: Doctor not found
 */
router.get("/:id", getSingleDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor information
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
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
 *       500:
 *         description: Server error
 */
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor’s information
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion successful
 *       500:
 *         description: Server error
 */
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

/**
 * @swagger
 * /doctors/profile/me:
 *   get:
 *     summary: Get the current doctor's profile information
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor profile information
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

// Add reviewRouter middleware
router.use("/:doctorId/reviews", reviewRouter);

export default router;
