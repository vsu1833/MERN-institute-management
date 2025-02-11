const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth')
const { createClass, getAllClass, getClassWithId, updateClassWithId, deleteClassWithId, createSubTeacher, updateSubTeacher, deleteSubTeacherWithId, getAttendeeTeacher } = require("../controller/class.controller");


router.post("/create",authMiddleware(['SCHOOL']), createClass);
router.get("/fetch-all",authMiddleware(['SCHOOL','TEACHER']),getAllClass);
router.get("/fetch-single/:id",  getClassWithId);
router.patch("/update/:id", authMiddleware(['SCHOOL']), updateClassWithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']), deleteClassWithId);
// router.post("/sub-teach/new/:id",createSubTeacher );
// router.post("/sub-teach/update/:classId/:subTeachId",updateSubTeacher );
// router.delete("/sub-teach/delete/:classId/:subTeachId",deleteSubTeacherWithId );
router.get("/attendee",authMiddleware(['TEACHER']), getAttendeeTeacher);

module.exports = router;