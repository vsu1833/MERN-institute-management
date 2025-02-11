require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

const Student = require("../model/student.model");
const Attendance = require('../model/attendance.model');
module.exports = {

   
    getStudentWithQuery: async(req, res)=>{
      
        try {
            const filterQuery = {};
            const schoolId = req.user.schoolId;
            console.log(schoolId,"schoolId")
            filterQuery['school'] = schoolId;
            if(req.query.hasOwnProperty('search')){
                filterQuery['name'] = {$regex: req.query.search, $options:'i'}
            }
            
            if(req.query.hasOwnProperty('student_class')){
                filterQuery['student_class'] = req.query.student_class
            }
    
            const filteredStudents = await Student.find(filterQuery).populate("student_class");
            res.status(200).json({success:true, data:filteredStudents})
        } catch (error) {
            console.log("Error in fetching Student with query", error);
            res.status(500).json({success:false, message:"Error  in fetching Student  with query."})
        }

    },


    registerStudent: async (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            Student.find({ email: fields.email[0] }).then(resp => {
                if (resp.length > 0) {
                    res.status(500).json({ success: false, message: "Email Already Exist!" })
                } else {

                    const photo = files.image[0];
                    let oldPath = photo.filepath;
                    let originalFileName = photo.originalFilename.replace(" ", "_")

                    let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/student', '/', originalFileName)

                    let photoData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, photoData, function (err) {
                        if (err) console.log(err);

                        var salt = bcrypt.genSaltSync(10);
                        var hashPassword = bcrypt.hashSync(fields.password[0], salt);

                        console.log(fields,"Fields")
                        const newStudent = new Student({
                            email: fields.email[0],
                            name: fields.name[0],
                            student_class:fields.student_class[0],
                            guardian:fields.guardian[0],
                            guardian_phone:fields.guardian_phone[0],
                            age: fields.age[0],
                            gender: fields.gender[0],

                            student_image: originalFileName,
                            password: hashPassword,
                            school:req.user.id

                        })

                        newStudent.save().then(savedData => {
                            console.log("Date saved", savedData);
                            res.status(200).json({ success: true, data: savedData, message:"Student is Registered Successfully." })
                        }).catch(e => {
                            console.log("ERRORO in Register", e)
                            res.status(500).json({ success: false, message: "Failed Registration." })
                        })

                    })


                }
            })

        })



    },
    loginStudent: async (req, res) => {
        Student.find({ email: req.body.email }).then(resp => {
            if (resp.length > 0) {
                const isAuth = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isAuth) {   
                    const token = jwt.sign(
                        {
                            id: resp[0]._id,
                            schoolId: resp[0].school,
                            email: resp[0].email,
                            image_url: resp[0].image_url,
                            name:resp[0].name,
                            role: 'STUDENT'
                        }, jwtSecret );

                       res.header("Authorization", token);

                   res.status(200).json({ success: true, message: "Success Login",  user: {
                    id: resp[0]._id,
                    email: resp[0].email,
                    image_url: resp[0].student_image,
                    name:resp[0].name,
                    role: 'STUDENT'} })
                }else {
                    res.status(401).json({ success: false, message: "Password doesn't match." })
                }

            } else {
                res.status(401).json({ success: false, message: "Email not registerd." })
            }
        })
    },
    getStudentWithId: async(req, res)=>{
        const id = req.params.id;
        const schoolId =  req.user.schoolId;
        Student.findOne({_id:id, school:schoolId}).populate("student_class").then(resp=>{
            if(resp){
                console.log("data",resp)
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Student data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getStudentWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Student Data" })
        })
    },
     getOwnDetails: async(req, res)=>{
        const id = req.user.id;
        const schoolId =  req.user.schoolId;
        Student.findOne({_id:id,school:schoolId}).populate("student_class").then(resp=>{
            if(resp){
                console.log("data",resp)
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Student data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getStudentWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Student Data" })
        })
    },
    // updateStudentWithId: async(req, res)=>{
       
    //     try {
    //         let id = req.params.id;
    //         const schoolId =  req.user.schoolId;
    //         console.log(req.body)
    //         await Student.findOneAndUpdate({_id:id,school:schoolId},{$set:{...req.body}});
    //         const StudentAfterUpdate =await Student.findOne({_id:id});
    //         res.status(200).json({success:true, message:"Student Updated", data:StudentAfterUpdate})
    //     } catch (error) {
            
    //         console.log("Error in updateStudentWithId", error);
    //         res.status(500).json({success:false, message:"Server Error in Update Student. Try later"})
    //     }

    // },
updateStudentWithId : async (req, res) => {
    const form =new formidable.IncomingForm({ multiples: false, uploadDir: path.join(__dirname, '../../frontend/public/images/uploaded/student'), keepExtensions: true });
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: "Error parsing the form data." });
      }
      try {
        const { id } = req.params;
        const student = await Student.findById(id);
  
        if (!student) {
          return res.status(404).json({ message: "Student not found." });
        }
  
        // Update text fields
        Object.keys(fields).forEach((field) => {
          student[field] = fields[field][0];
        });
  
        // Handle image file if provided
        if (files.image) {
          // Delete the old image if it exists
          const oldImagePath = path.join(__dirname, '../../frontend/public/images/uploaded/student',  student.student_image);
           
          if (student.student_image && fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (unlinkErr) => {
              if (unlinkErr) console.log("Error deleting old image:", unlinkErr);
            });
          }
  
          // Set the new image filename
        
          let filepath = files.image[0].filepath;
          const originalFileName = path.basename(files.image[0].originalFilename.replace(" ", "_"));
          let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/student', '/', originalFileName)

          let photoData = fs.readFileSync(filepath);
          
         fs.writeFileSync(newPath, photoData);
          student.student_image=originalFileName;
        }
  
        // Save the updated student document
        await student.save();
        res.status(200).json({ message: "Student updated successfully", data: student });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error updating student details." });
      }
    });
  },
    deleteStudentWithId: async(req, res)=>{
        try {
            let id = req.params.id;
            const schoolId =  req.user.schoolId;
            await Attendance.deleteMany({school:schoolId,student:id})
            await Student.findOneAndDelete({_id:id, school:schoolId,});
            const studentAfterDelete =await Student.findOne({_id:id});
            res.status(200).json({success:true, message:"Student  deleted", data:studentAfterDelete})
        } catch (error) {
            console.log("Error in updateStudentWithId", error);
            res.status(500).json({success:false, message:"Server Error in deleted Student. Try later"})
        }

    },
    signOut:async(req, res)=>{
       

        try {
            res.header("Authorization",  "");
            "Authorization"
            res.status(200).json({success:true, messsage:"Student Signed Out  Successfully."})
        } catch (error) {
            console.log("Error in Sign out", error);
            res.status(500).json({success:false, message:"Server Error in Signing Out. Try later"})
        }
    },
    isStudentLoggedIn: async(req,  res)=>{
        try {
            let token = req.header("Authorization");
            if(token){
                var decoded = jwt.verify(token, jwtSecret);
                console.log(decoded)
                if(decoded){
                    res.status(200).json({success:true,  data:decoded, message:"Student is a logged in One"})
                }else{
                    res.status(401).json({success:false, message:"You are not Authorized."})
                }
            }else{
                res.status(401).json({success:false, message:"You are not Authorized."})
            }
        } catch (error) {
            console.log("Error in isStudentLoggedIn", error);
            res.status(500).json({success:false, message:"Server Error in Student Logged in check. Try later"})
        }
    }
   
}