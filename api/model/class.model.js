const mongoose = require("mongoose");
const asignSubTeachSchema =new mongoose.Schema({
    subject:{type:mongoose.Schema.ObjectId, ref:'Subject'},
    teacher:{type:mongoose.Schema.ObjectId, ref:"Teacher"}
})
const classSchema = new mongoose.Schema({
    school:{type:mongoose.Schema.ObjectId, ref:'School'},
    class_text:{type:String, required:true},
    class_num:{type:Number,required:true},
    asignSubTeach:[asignSubTeachSchema],
    attendee:{type:mongoose.Schema.ObjectId, ref:'Teacher', required:false},
    createdAt:{type:Date, default:new Date()}

})

module.exports = mongoose.model("Class", classSchema)