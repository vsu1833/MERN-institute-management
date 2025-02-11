const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { createPeriod, getTeacherPeriods, getPeriods, getClassPeriods, updatePeriod, deletePeriod, getPeriodsWithId } = require('../controller/period.controller');

router.post('/create',authMiddleware(['SCHOOL']), createPeriod);
router.get('/all',authMiddleware(['SCHOOL']), getPeriods)
router.get('/teacher/:teacherId',authMiddleware(['SCHOOL','TEACHER']), getTeacherPeriods);
router.get('/class/:classId',authMiddleware(['SCHOOL','STUDENT','TEACHER']), getClassPeriods);
router.get('/:id',authMiddleware(['SCHOOL']), getPeriodsWithId)
router.put('/update/:id',authMiddleware(['SCHOOL']),  updatePeriod);
router.delete('/delete/:id',authMiddleware(['SCHOOL']), deletePeriod);

module.exports = router;
