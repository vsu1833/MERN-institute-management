const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { newExamination,  getExaminationByClass, updateExaminaitonWithId, deleteExaminationById, getExaminationById, getAllExaminations} = require("../controller/examination.controller");


router.post("/new", authMiddleware(['SCHOOL']),newExamination);
router.get("/all", authMiddleware(['SCHOOL','TEACHER']), getAllExaminations);
router.get("/fetch-class/:classId",authMiddleware(['SCHOOL','STUDENT','TEACHER']),  getExaminationByClass);
router.get('/single/:id',authMiddleware(['SCHOOL']), getExaminationById );
router.patch("/update/:id",authMiddleware(['SCHOOL']), updateExaminaitonWithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),  deleteExaminationById);

module.exports = router;