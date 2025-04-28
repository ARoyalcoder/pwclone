import express from "express";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

// 🛡 Allowed frontend URLs (Vercel + Localhost)
const allowedOrigins = [
  "https://pwclone-kappa.vercel.app",
  "http://172.16.1.162:5173",
  "https://pwclone.onrender.com",
    // No trailing slash here
];

// ⚡ Handle Webhook (raw body parsing FIRST)
app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));

// ⚡ Setup CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies and credentials
}));

// ✅ Other middleware
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/purchase", purchaseRoute);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
