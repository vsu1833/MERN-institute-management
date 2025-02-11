require("dotenv").config();

const Class = require("../model/class.model");
const Student = require("../model/student.model");
const Exam = require("../model/examination.model");
const Period = require("../model/period.model");
module.exports = {

    getAllClass: async(req,res)=>{
         try {
            const schoolId = req.user.schoolId;
            const allClass= await Class.find({school:schoolId});
            res.status(200).json({success:true, message:"Success in fetching all  Class", data:allClass})
         } catch (error) {
            console.log("Error in getAllClass", error);
            res.status(500).json({success:false, message:"Server Error in Getting All Class. Try later"})
        }

    },
    createClass: (req, res) => {
       const schoolId = req.user.id;
       const newClass = new Class({...req.body,school:schoolId});
       newClass.save().then(savedData => {
           console.log("Date saved", savedData);
           res.status(200).json({ success: true, data: savedData, message:"Class is Created Successfully." })
       }).catch(e => {
           console.log("ERRORO in Register", e)
           res.status(500).json({ success: false, message: "Failed Creation of Class." })
       })

 },
    getClassWithId: async(req, res)=>{
        console.log("ID CLASS", req.params.id)
        const id = req.params.id;
        Class.findById(id).populate("asignSubTeach.subject").populate("asignSubTeach.teacher").populate("attendee").then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Class data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getClassWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Class Data" })
        })
    },

    updateClassWithId: async(req, res)=>{
       
        try {
            let id = req.params.id;
            console.log(req.body)
            await Class.findOneAndUpdate({_id:id},{$set:{...req.body}});
            const ClassAfterUpdate =await Class.findOne({_id:id});
            res.status(200).json({success:true, message:"Class Updated", data:ClassAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateClassWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Class. Try later"})
        }

    },
    deleteClassWithId: async(req, res)=>{
       
        try {
            let id = req.params.id;
            const schoolId = req.user.schoolId;
            const classStudentCount =(await Student.find({student_class:id,school:schoolId})).length;
            const classExamCount =(await Exam.find({class:id,school:schoolId})).length;
            const classPeriodCount =(await Period.find({class:id,school:schoolId})).length;
            if((classStudentCount===0) && (classExamCount===0) && (classPeriodCount===0)){
                await Class.findOneAndDelete({_id:id,school:schoolId});
                const classAfterDelete = await Class.findOne({_id:id});
                res.status(200).json({success:true, message:"Class Deleted.", data:classAfterDelete})
            }else{
                res.status(500).json({success:false, message:"This class is already in use."})
            }
          
        } catch (error) {
            
            console.log("Error in updateClassWithId", error);
            res.status(500).json({success:false, message:"Server Error in Deleting Class. Try later"})
        }

    },
    createSubTeacher:async(req, res)=>{
        try {
            let id = req.params.id;
            const schoolId = req.user.schoolId;
            const classDetails =await Class.findOne({_id:id,school:schoolId});
            let asignSubTeach = classDetails.asignSubTeach;
            console.log(asignSubTeach)
             asignSubTeach.push({...req.body})
            await Class.findOneAndUpdate({_id:id},{$set:{asignSubTeach}});
            const ClassAfterUpdate =await Class.findOne({_id:id});
            res.status(200).json({success:true, message:"New Subject & Teacher Assigned.", data:ClassAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateClassWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Class. Try later"})
        }


    },
    updateSubTeacher:async(req, res)=>{
        try {
            let classId = req.params.classId;
            const subTeachId = req.params.subTeachId;
            const classDetails =await Class.findOne({_id:classId});
            let asignSubTeach = classDetails.asignSubTeach;
            asignSubTeach = asignSubTeach.map(item=>{
                if(item._id==subTeachId){
                    // item = {...item, subject:item.subject, teacher:item.teacher}
                    item.subject = req.body.subject;
                    item.teacher = req.body.teacher;
                    console.log(req.body)
                    return item;
                }
                return item
            })
            
            // console.log(asignSubTeach)
            await Class.findOneAndUpdate({_id:classId},{$set:{asignSubTeach}});
            const ClassAfterUpdate =await Class.findOne({_id:classId});
            res.status(200).json({success:true, message:"Subject & Teacher Assignment Updated.", data:ClassAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateClassWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Class. Try later"})
        }


    },
    deleteSubTeacherWithId:async(req, res)=>{
        try {
            let classId = req.params.classId;
            const subTeachId = req.params.subTeachId;
            const classDetails =await Class.findOne({_id:classId});
            let asignSubTeach = classDetails.asignSubTeach;
            asignSubTeach.forEach((item,i)=>{
                if(item._id==subTeachId){
                    asignSubTeach.splice(i,1)

                }
            })
            
            console.log(asignSubTeach)
            await Class.findOneAndUpdate({_id:classId},{$set:{asignSubTeach}});
            const ClassAfterUpdate =await Class.findOne({_id:classId});
            res.status(200).json({success:true, message:"Subject & Teacher Assignment Cancelled.", data:ClassAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateClassWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Class. Try later"})
        }


    },
    getAttendeeTeacher: async(req, res)=>{
        try {
            let attendeeClass =await Class.find({attendee:req.user.id});
           attendeeClass = attendeeClass.map(x=>{
          return {class_num:x.class_num,class_text: x.class_text,classId: x._id}
        })
            res.status(200).json(attendeeClass)
            
        } catch (error) {
            console.log("Error in getting attendee", error);
            res.status(500).json({success:false, message:"Server Error in getting  Attendee. Try later"})
        }
    }
}