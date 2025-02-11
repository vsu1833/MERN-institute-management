require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

const Teacher = require("../model/teacher.model");
module.exports = {

    getTeacherWithQuery: async(req, res)=>{
        try {
            const filterQuery = {};
            const schoolId = req.user.schoolId;
            filterQuery['school'] = schoolId;
            if(req.query.hasOwnProperty('search')){
                filterQuery['name'] = {$regex: req.query.search, $options:'i'}
            }
            
          
    
            const filteredTeachers = await Teacher.find(filterQuery);
            res.status(200).json({success:true, data:filteredTeachers})
        } catch (error) {
            console.log("Error in fetching Teacher with query", error);
            res.status(500).json({success:false, message:"Error  in fetching Teacher  with query."})
        }

    },


    registerTeacher: async (req, res) => {
        const form = new formidable.IncomingForm();
        const schoolId = req.user.schoolId;
        form.parse(req, (err, fields, files) => {
            Teacher.find({ email: fields.email[0] }).then(resp => {
                if (resp.length > 0) {
                    res.status(500).json({ success: false, message: "Email Already Exist!" })
                } else {

                    const photo = files.image[0];
                    let oldPath = photo.filepath;
                    let originalFileName = photo.originalFilename.replace(" ", "_")

                    let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/teacher', '/', originalFileName)

                    let photoData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, photoData, function (err) {
                        if (err) console.log(err);

                        var salt = bcrypt.genSaltSync(10);
                        var hashPassword = bcrypt.hashSync(fields.password[0], salt);

                        const newTeacher = new Teacher({
                            email: fields.email[0],
                            name: fields.name[0],
                            qualification:fields.qualification[0],
                            age: fields.age[0],
                            gender: fields.gender[0],

                            teacher_image: originalFileName,
                            password: hashPassword,
                            school:schoolId
                         
                        })

                        newTeacher.save().then(savedData => {
                            console.log("Date saved", savedData);
                            res.status(200).json({ success: true, data: savedData, message:"Teacher is Registered Successfully." })
                        }).catch(e => {
                            console.log("ERRORO in Register", e)
                            res.status(500).json({ success: false, message: "Failed Registration." })
                        })

                    })


                }
            })

        })



    },
    loginTeacher: async (req, res) => {
        Teacher.find({ email: req.body.email }).then(resp => {
            if (resp.length > 0) {
                const isAuth = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isAuth) {   
                    const token = jwt.sign(
                        {
                            id: resp[0]._id,
                            schoolId:resp[0].school,
                            name: resp[0].name,
                            image_url: resp[0].teacher_image,
                            role: 'TEACHER'
                        }, jwtSecret );

                       res.header("Authorization", token);
                       console.log("Success")
                   res.status(200).json({ success: true, message: "Success Login",  user: { id: resp[0]._id, username: resp[0].username, image_url: resp[0].teacher_image, role: 'TEACHER' } })
                }else {
                    res.status(401).json({ success: false, message: "Password doesn't match." })
                }

            } else {
                res.status(401).json({ success: false, message: "Email not registerd." })
            }
        })
    },
    getTeacherOwnDetails: async(req, res)=>{
        const id = req.user.id;
        Teacher.findOne({_id:id, school:req.user.schoolId}).then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Teacher data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getTeacherWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Teacher Data" })
        })
    },
    getTeacherWithId: async(req, res)=>{
        const id = req.params.id;
        Teacher.findById(id).then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Teacher data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getTeacherWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Teacher Data" })
        })
    },

    // updateTeacherWithId: async(req, res)=>{
       
    //     try {
    //         let id = req.params.id;
    //         console.log(req.body)
    //         await Teacher.findOneAndUpdate({_id:id},{$set:{...req.body}});
    //         const TeacherAfterUpdate =await Teacher.findOne({_id:id});
    //         res.status(200).json({success:true, message:"Teacher Updated", data:TeacherAfterUpdate})
    //     } catch (error) {
            
    //         console.log("Error in updateTeacherWithId", error);
    //         res.status(500).json({success:false, message:"Server Error in Update Teacher. Try later"})
    //     }

    // },
    updateTeacherWithId: async (req, res) => {
        const form =new formidable.IncomingForm({ multiples: false, uploadDir: path.join(__dirname, '../../frontend/public/images/uploaded/teacher'), keepExtensions: true });
      
        form.parse(req, async (err, fields, files) => {
          if (err) {
            return res.status(400).json({ message: "Error parsing the form data." });
          }
          try {
            const { id } = req.params;
            const teacher = await Teacher.findById(id);
      
            if (!teacher) {
              return res.status(404).json({ message: "teacher not found." });
            }
      
            // Update text fields
            Object.keys(fields).forEach((field) => {
              teacher[field] = fields[field][0];
            });
      
            // Handle image file if provided
            if (files.image) {
              // Delete the old image if it exists
              const oldImagePath = path.join(__dirname, '../../frontend/public/images/uploaded/teacher',  teacher.teacher_image);
               
              if (teacher.teacher_image && fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (unlinkErr) => {
                  if (unlinkErr) console.log("Error deleting old image:", unlinkErr);
                });
              }
      
              // Set the new image filename
            
              let filepath = files.image[0].filepath;
              const originalFileName = path.basename(files.image[0].originalFilename.replace(" ", "_"));
              let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/teacher', '/', originalFileName)
    
              let photoData = fs.readFileSync(filepath);
              
             fs.writeFileSync(newPath, photoData);
              teacher.teacher_image=originalFileName;
            }
      
            // Save the updated teacher document
            await teacher.save();
            res.status(200).json({ message: "teacher updated successfully", data: teacher });
          } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error updating teacher details." });
          }
        })
    },
    deleteTeacherWithId: async(req, res)=>{
        try {
            let id = req.params.id;
            // console.log(req.body)
            await Teacher.findOneAndDelete({_id:id});
            const TeacherAfterDelete =await Teacher.findOne({_id:id});
            res.status(200).json({success:true, message:"Teacher  deleted", data:TeacherAfterDelete})
        } catch (error) {
            console.log("Error in updateTeacherWithId", error);
            res.status(500).json({success:false, message:"Server Error in deleted Teacher. Try later"})
        }

    },
    signOut:async(req, res)=>{
       

        try {
            res.header("Authorization",  "");
            "Authorization"
            res.status(200).json({success:true, messsage:"Teacher Signed Out  Successfully."})
        } catch (error) {
            console.log("Error in Sign out", error);
            res.status(500).json({success:false, message:"Server Error in Signing Out. Try later"})
        }
    },
    isTeacherLoggedIn: async(req,  res)=>{
        try {
            let token = req.header("Authorization");
            if(token){
                var decoded = jwt.verify(token, jwtSecret);
                console.log(decoded)
                if(decoded){
                    res.status(200).json({success:true,  data:decoded, message:"Teacher is a logged in One"})
                }else{
                    res.status(401).json({success:false, message:"You are not Authorized."})
                }
            }else{
                res.status(401).json({success:false, message:"You are not Authorized."})
            }
        } catch (error) {
            console.log("Error in isTeacherLoggedIn", error);
            res.status(500).json({success:false, message:"Server Error in Teacher Logged in check. Try later"})
        }
    }
   
}