const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    school:{type:mongoose.Schema.ObjectId, ref:'School'},
    email:{ type: String,  required:true },
    name:{type:String, required:true},
    qualification:{type:String, required:true},
    age:{type:String, required:true},
    gender:{type:String, required:true},
    teacher_image:{type:String,  required:true},
    createdAt:{type:Date, default: new Date()},

    password:{type:String, required:true}

})

module.exports = mongoose.model("Teacher", teacherSchema)