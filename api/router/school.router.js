const express = require("express");
const authMiddleware = require('../auth/auth');
const { getAllSchools, updateSchoolWithId,signOut,isSchoolLoggedIn, registerSchool, loginSchool, getSchoolOwnData } = require("../controller/school.controller");

const router = express.Router();

router.post('/register', registerSchool);
router.get("/all", getAllSchools);
router.post("/login", loginSchool);
router.patch("/update",authMiddleware(['SCHOOL']), updateSchoolWithId);
router.get("/fetch-single",authMiddleware(['SCHOOL']),getSchoolOwnData);
router.get("/sign-out", signOut);
router.get("/is-login",  isSchoolLoggedIn)

module.exports = router;