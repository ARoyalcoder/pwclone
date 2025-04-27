import express from "express";
import { createCheckoutSession, getAllPurchaseCourse, getCourseDetailsWithPurchaseStatus, razorpayWebhook } from "../controller/coursePurchase.controller.js";
import IsAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ❌ Don't apply express.raw() here again! Already handled in index.js
router.post("/webhook", razorpayWebhook);

// Other normal routes
router.post("/checkout/create-checkout-session", IsAuthenticated, createCheckoutSession);
router.route("/course/:courseId/detail-with-status").get(IsAuthenticated, getCourseDetailsWithPurchaseStatus);
router.route("/").get(IsAuthenticated, getAllPurchaseCourse);

export default router;
