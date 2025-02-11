require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser  = require("cookie-parser");
const mongoose = require("mongoose");

// ROUTERS
const schoolRouter = require("./router/school.router")
const studentRouter = require("./router/student.router")
const classRouter = require("./router/class.router")
const subjectRouter = require("./router/subject.router")
const teacherRouter = require('./router/teacher.router')
const examRouter =  require('./router/examination.router')
const attendanceRoutes = require('./router/attendance.router');
const periodRoutes = require("./router/period.router");
const noticeRoutes = require("./router/notice.router");
const authMiddleware = require("./auth/auth");
const { authCheck } = require("./controller/auth.controller");

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {exposedHeaders:"Authorization"}
app.use(cors(corsOptions));

// MONGODB CONNECTION
mongoose.connect(`mongodb://localhost:27017/school_management`).then(db=>{
    console.log("MongoDb is Connected Successfully.")
}).catch(e=>{
    console.log("MongoDb Error",e)
})



app.use("/api/school", schoolRouter)
app.use("/api/student", studentRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/class", classRouter)
app.use("/api/subject", subjectRouter)
app.use('/api/examination', examRouter)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/period',  periodRoutes)
app.use('/api/notices', noticeRoutes)

app.get('/api/auth/check',authCheck)


const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log("Server is running at port =>",PORT)
})