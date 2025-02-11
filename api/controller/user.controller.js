require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

const User = require("../model/user.model");
module.exports = {

    getAllUsers: async(req,res)=>{
         try {
            const users= await User.find();
            res.status(200).json({success:true, message:"Success in fetching all  users", data:users})
         } catch (error) {
            console.log("Error in getAllUsers", error);
            res.status(500).json({success:false, message:"Server Error in Getting All Users. Try later"})
        }

    },
    register: async (req, res) => {
        const form = new formidable.IncomingForm();
        const schoolId = req.user.schoolId;
        form.parse(req, (err, fields, files) => {
            User.find({ email: fields.email }).then(resp => {
                if (resp.length > 0) {
                    res.status(500).json({ success: false, message: "Email Already Exist!" })
                } else {

                    const photo = files.image[0];
                    let oldPath = photo.filepath;
                    let originalFileName = photo.originalFilename.replace(" ", "_")

                    let newPath = path.join(__dirname, '../../movie casting/public/images/uploaded/user', '/', originalFileName)

                    let photoData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, photoData, function (err) {
                        if (err) console.log(err);

                        var salt = bcrypt.genSaltSync(10);
                        var hashPassword = bcrypt.hashSync(fields.password[0], salt);

                        console.log(fields,"Fields")
                        const newUser = new User({
                            email: fields.email[0],
                            name: fields.username[0],
                            password: hashPassword,
                            country: fields.country[0],
                            image_url: originalFileName[0],
                            eye_color: fields.eye_color[0],
                            hair_color: fields.hair_color[0],
                            height: fields.height[0],
                            weight: fields.height[0],
                            age: fields.age[0],
                            gender: fields.gender[0],
                            

                        })

                        newUser.save().then(savedData => {
                            console.log("Date saved", savedData);
                            res.status(200).json({ success: true, data: savedData, message:"User is Registered Successfully." })
                        }).catch(e => {
                            console.log("ERRORO in Register", e)
                            res.status(500).json({ success: false, message: "Failed Registration." })
                        })

                    })


                }
            })

        })



    },
    login: async (req, res) => {
        User.find({ email: req.body.email }).then(resp => {
            if (resp.length > 0) {
                const isAuth = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isAuth) {   
                    const token = jwt.sign(
                        {
                            id: resp[0]._id,
                            username: resp[0].username,
                            image_url: resp[0].image_url,
                            role: resp[0].role
                        }, jwtSecret );

                       res.header("Authorization", token);

                   res.status(200).json({ success: true, message: "Success Login",  user: { id: resp[0]._id, username: resp[0].username, image_url: resp[0].image_url, role: resp[0].role } })
                }else {
                    res.status(401).json({ success: false, message: "Password doesn't match." })
                }

            } else {
                res.status(401).json({ success: false, message: "Email not registerd." })
            }
        })
    },
    getUserWithId: async(req, res)=>{
        const id = req.user.id;
        User.findById(id).then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "User data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getUserWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  User Data" })
        })
    },

    updateUserWithId: async(req, res)=>{
       
        try {
            let id = req.user.id;
            console.log(req.body)
            await User.findOneAndUpdate({_id:id},{$set:{...req.body.values}});
            const userAfterUpdate =await User.findOne({_id:id});
            res.status(200).json({success:true, message:"User Updated", data:userAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateUserWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update User. Try later"})
        }

    },
    signOut:async(req, res)=>{
       

        try {
            res.header("Authorization",  "");
            "Authorization"
            res.status(200).json({success:true, messsage:"User Signed Out  Successfully."})
        } catch (error) {
            console.log("Error in Sign out", error);
            res.status(500).json({success:false, message:"Server Error in Signing Out. Try later"})
        }
    },
    isUserLoggedIn: async(req,  res)=>{
        try {
            let token = req.header("Authorization");
            if(token){
                var decoded = jwt.verify(token, jwtSecret);
                console.log(decoded)
                if(decoded){
                    res.status(200).json({success:true,  data:decoded, message:"User is a logged in One"})
                }else{
                    res.status(401).json({success:false, message:"You are not Authorized."})
                }
            }else{
                res.status(401).json({success:false, message:"You are not Authorized."})
            }
        } catch (error) {
            console.log("Error in isUserLoggedIn", error);
            res.status(500).json({success:false, message:"Server Error in User Logged in check. Try later"})
        }
    },
    isUserAdmin: async(req,  res)=>{
        try {
            let token = req.header("Authorization");
            if(token){
                var decoded = jwt.verify(token, jwtSecret);
                if(decoded){
                    if(decoded.role=="ADMIN"){
                        res.status(200).json({success:true, message:"User is a Admin."})
                    }else{
                        res.status(401).json({success:false, message:"You are not Authorized Admin."})
                    }
                 
                }else{
                    res.status(401).json({success:false, message:"You are not Authorized."})
                }
            }else{
                res.status(401).json({success:false, message:"You are not Authorized."})
            }
        } catch (error) {
            console.log("Error in isUserLoggedIn", error);
            res.status(500).json({success:false, message:"Server Error in User Logged in check. Try later"})
        }
    }
}