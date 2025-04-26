// server/config/razorpay.js
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_PUBLISHABLE_KEY,  // Use your Razorpay key here
  key_secret: process.env.RAZORPAY_SECRET_KEY,   // Use your Razorpay secret key here
});

export default razorpayInstance;
