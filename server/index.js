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

const allowedOrigins = [
  "https://pwclone-2vv1-maginoiei-adityas-projects-a6dac2d1.vercel.app",
   // for your local development
];

// ⚡ Handle webhook raw body FIRST
app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));

// ⚡ Other middleware AFTER webhook
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you are using cookies/auth tokens
}));



// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/purchase", purchaseRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
