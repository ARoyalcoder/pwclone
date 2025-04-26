import express from "express"
import IsAuthenticated from "../middlewares/isAuthenticated.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controller/courseProgress.controller.js";


const router  = express.Router();



router.route("/:courseId").get(IsAuthenticated, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(IsAuthenticated , updateLectureProgress)

router.route("/:courseId/complete").post(IsAuthenticated , markAsCompleted);
router.route("/:courseId/incomplete").post(IsAuthenticated , markAsInCompleted);


export default router ;  