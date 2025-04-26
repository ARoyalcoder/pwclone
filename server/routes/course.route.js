import express from "express"
import IsAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../utils/multer.js"
import { CreateCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controller/course.controller.js"

const router = express.Router();




// here is all route who belong to course and lecture   


router.route("/published-courses").get(getPublishedCourse);
router.route("/search").get(IsAuthenticated , searchCourse);
router.route("/").post(IsAuthenticated, CreateCourse);
router.route("/").get(IsAuthenticated, getCreatorCourses);
router.route("/:courseId").put(IsAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(IsAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(IsAuthenticated, createLecture);
router.route("/:courseId/lecture").get(IsAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(IsAuthenticated, editLecture);
router.route("/lecture/:lectureId").get(IsAuthenticated, getLectureById);
router.route("/lecture/:lectureId").delete(IsAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(IsAuthenticated, getLectureById);
router.route("/:courseId").patch(IsAuthenticated , togglePublishCourse);


export default router; 