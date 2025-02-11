// routes/notices.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { newNotice, fetchAllAudiance, fetchAudiance, deleteNotice, editNotice } = require("../controller/notice.controller");

router.post("/add", authMiddleware(['SCHOOL']), newNotice);
router.get("/fetch/all",authMiddleware(['SCHOOL','TEACHER','STUDENT']), fetchAllAudiance)
router.get("/fetch/:audience",authMiddleware(['SCHOOL','TEACHER','STUDENT']),fetchAudiance);
router.put("/:id",authMiddleware(['SCHOOL']),editNotice)
router.delete("/:id",authMiddleware(['SCHOOL']),deleteNotice)
  
module.exports = router;
