const express = require("express");
const { getStudentWithQuery, loginStudent,updateStudentWithId,getStudentWithId,signOut,isStudentLoggedIn, getOwnDetails, registerStudent, deleteStudentWithId } = require("../controller/student.controller");
const authMiddleware = require("../auth/auth");
const router = express.Router();

router.post('/register',authMiddleware(['SCHOOL']), registerStudent);
router.get("/fetch-with-query",authMiddleware(['SCHOOL','TEACHER']),getStudentWithQuery);
router.post("/login", loginStudent);
router.patch("/update/:id",authMiddleware(['SCHOOL']), updateStudentWithId);
router.get("/fetch-own", authMiddleware(['STUDENT']), getOwnDetails);
router.get("/fetch-single/:id", authMiddleware(['STUDENT','SCHOOL']), getStudentWithId);
router.delete("/delete/:id",authMiddleware(['SCHOOL']),  deleteStudentWithId)
router.get("/sign-out", signOut);
router.get("/is-login",  isStudentLoggedIn)

module.exports = router;