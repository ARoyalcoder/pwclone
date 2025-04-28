import Razorpay from "../config/razorpay.js";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Lecture } from "../models/lecture.model.js";

// Create Checkout Session


export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found!" });

        const amount = course.coursePrice * 100;

        // Create Razorpay Order
        const order = await Razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                courseId: courseId.toString(),
                userId: userId.toString(),
            },
        });
        if (!order) {
            return res.status(400).json({ success: false, message: "Error while creating Razorpay order" });
        }

        // Save the pending purchase in DB
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending",
            paymentId: order.id,
        });

        await newPurchase.save();

        return res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_PUBLISHABLE_KEY,
            courseTitle: course.courseTitle,
            thumbnail: course.courseThumbnail,
            successUrl: `https://pwclone-kappa.vercel.app/course-progress/${courseId}`,
            cancelUrl: `https://pwclone-kappa.vercel.app/course-detail/${courseId}`,
            url: null, // mimic Stripe response for frontend compatibility
        });
    } catch (error) {
        console.error("Checkout session error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const razorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const rawBody = req.body; // this will be Buffer because of express.raw()

    try {
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(rawBody)
            .digest("hex");

        if (signature !== expectedSignature) {
            console.log("Signature mismatch");
            return res.status(400).send("Webhook signature mismatch");
        }

        const event = JSON.parse(rawBody.toString('utf8'));

        if (event.event !== "payment.captured") {
            return res.status(200).send("Event received");
        }

        const { order_id, amount } = event.payload.payment.entity;

        const purchase = await CoursePurchase.findOne({ paymentId: order_id }).populate("courseId");
        if (!purchase) return res.status(404).json({ message: "Purchase not found" });
        if (purchase.status === "completed") {
            return res.status(200).send("Already processed");
        }

        purchase.status = "completed";
        purchase.amount = amount / 100;
        await purchase.save();

        if (purchase.courseId?.lectures?.length) {
            await Lecture.updateMany(
                { _id: { $in: purchase.courseId.lectures } },
                { $set: { isPreviewFree: true } }
            );
        }

        await Promise.all([
            User.findByIdAndUpdate(purchase.userId, {
                $addToSet: { enrolledCourses: purchase.courseId._id }
            }),
            Course.findByIdAndUpdate(purchase.courseId._id, {
                $addToSet: { enrolledStudents: purchase.userId }
            })
        ]);

        res.status(200).send("Payment processed successfully");

    } catch (err) {
        console.error("Webhook error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// export const razorpayWebhook = async (req, res) => {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//     const signature = req.headers["x-razorpay-signature"];
//     const payload = req.body; // ⚠️ This is a buffer because of express.raw()

//     const expectedSignature = crypto
//         .createHmac("sha256", secret)
//         .update(payload)
//         .digest("hex");
//     console.log("Expected Signature:", expectedSignature);
//     console.log("Received Signature:", signature);
//     if (signature !== expectedSignature) {
//         console.log("Expected:", expectedSignature);
//         console.log("Received:", signature);
//         return res.status(400).send("Webhook signature mismatch");
//     }

//     const event = JSON.parse(payload); // ✅ Parse after signature verified

//     if (event.event !== "payment.captured") {
//         return res.status(200).send("Event received");
//     }

//     try {
//         const { order_id, amount } = event.payload.payment.entity;

//         const purchase = await CoursePurchase.findOne({ paymentId: order_id }).populate("courseId");
//         if (!purchase) return res.status(404).json({ message: "Purchase not found" });

//         purchase.status = "completed";
//         purchase.amount = amount / 100;
//         await purchase.save();

//         if (purchase.courseId?.lectures?.length) {
//             await Lecture.updateMany(
//                 { _id: { $in: purchase.courseId.lectures } },
//                 { $set: { isPreviewFree: true } }
//             );
//         }

//         await Promise.all([
//             User.findByIdAndUpdate(purchase.userId, {
//                 $addToSet: { enrolledCourses: purchase.courseId._id }
//             }),
//             Course.findByIdAndUpdate(purchase.courseId._id, {
//                 $addToSet: { enrolledStudents: purchase.userId }
//             })
//         ]);

//         res.status(200).send("Payment processed successfully");
//     } catch (err) {
//         console.error("Webhook error:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }


// };

// for trail purpose 


// export const getCourseDetailsWithPurchaseStatus = async (req, res) => {
//     try {
//         const userId = req.id;
//         const { courseId } = req.params;
//         console.log( courseId);
//         const course = await Course.findById(courseId).populate({ path: "creator" }).populate({ path: "lectures" });
//         const purchased = await CoursePurchase.findOne({ userId, courseId });
//         if (!course) {
//             return res.status(404).json({
//                 message: "course not found ",
//             })
//         }
//         return res.status(200).json({
//             course,
//             purchased: !!purchased,
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message : "not working",
//         })
//     }
// }

export const getCourseDetailsWithPurchaseStatus = async (req, res) => {
    try {
        const userId = req.id;
        let { courseId } = req.params;

        console.log("Raw courseId from params:", courseId);

        // Remove any leading colon or invalid characters
        courseId = courseId.replace(/[^a-fA-F0-9]/g, "");

        // Validate ObjectId length (MongoDB uses 24-char hex strings)
        if (courseId.length !== 24) {
            return res.status(400).json({ message: "Invalid course ID format" });
        }

        const course = await Course.findById(courseId)
            .populate({ path: "creator" })
            .populate({ path: "lectures" });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const purchased = await CoursePurchase.findOne({ userId, courseId });

        return res.status(200).json({
            course,
            purchased: !!purchased,
        });

    } catch (error) {
        console.log("Course detail error:", error);
        return res.status(500).json({ message: "Something went wrong in getCourseDetailsWithPurchaseStatus" });
    }
};




export const getAllPurchaseCourse = async (_, res) => {
    try {
        const purchasedCourse = await CoursePurchase.find({ status: "completed" }).populate("courseId");
        if (!purchasedCourse) {
            return res.status(404).json({
                purchasedCourse: [],
            })
        }
        return res.status(200).json({
            purchasedCourse,
        })
    } catch (error) {
        console.log(error);
    }
}