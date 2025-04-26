import express from "express";
const app= express();
app.use(express.json());
const router = express.Router();
import IsAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchaseCourse, getCourseDetailsWithPurchaseStatus, razorpayWebhook } from "../controller/coursePurchase.controller.js";




router.post("/checkout/create-checkout-session", IsAuthenticated, createCheckoutSession);



router.post("/webhook",   razorpayWebhook);
router.route("/course/:courseId/detail-with-status").get(IsAuthenticated,getCourseDetailsWithPurchaseStatus);


router.route("/").get(IsAuthenticated,getAllPurchaseCourse);


export default router;
