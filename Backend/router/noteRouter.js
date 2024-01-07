const express = require("express");
const Notes = require("../model/noteModel");
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");


const jwt_secret_key = "ajaysirstask123"

const router = express.Router();
router.post("/addnote/:token", async(req, res)=>{
    try {
        let success = false;
        const {title, description} = req.body;
        const token  = req.params.token;
        // console.log(token);


        // fetc user**************
        if(!token){
            success = false;
            return res.status(401).json({success, message: "Please authenticate a valid token"});
        }
        const verified_token = await jwt.verify(token, jwt_secret_key);
        const user_data = await Users.findOne({_id: verified_token.user.id});

        // fetc user************** 

        // console.log(user_data._id);
        const user_note = await Notes({
            user: user_data._id,
            title, 
            description,
        })

        const saved_user_note = await user_note.save();

        // final
        success = true;
        res.status(200).json({success, message: "Note added successfully", saved_user_note})
    } catch (error) {
        console.log("add note error**************");
        console.log(error);
        let success = false;
        res.status(500).json({success, message: "add note error**************"});
    }
});


router.get("/getallnote/:token", async(req, res)=>{
    try {
        let success = false;
        const token  = req.params.token;
        // console.log(token);


        // fetc user**************
        if(!token){
            success = false;
            return res.status(401).json({success, message: "Please authenticate a valid token"});
        }
        const verified_token = await jwt.verify(token, jwt_secret_key);
        const user_data = await Users.findOne({_id: verified_token.user.id});

        // fetc user************** 

        const user_notes = await Notes.find({user: user_data._id});

        // final
        success = true;
        res.status(200).json({success, message: "Got users all note", user_notes})
    } catch (error) {
        console.log("get user's all note error**************");
        console.log(error);
        let success = false;
        res.status(500).json({success, message: "get user's all note error**************"});
    }
});


router.delete("/deletenote/:id/:token", async(req, res)=>{
    try {
        let success = false;
        const token  = req.params.token;
        const id  = req.params.id;
        // fetc user**************
        if(!token){
            success = false;
            return res.status(401).json({success, message: "Please authenticate a valid token"});
        }
        const verified_token = await jwt.verify(token, jwt_secret_key);
        const user_data = await Users.findOne({_id: verified_token.user.id});

        // fetc user************** 


        // main coding📌📌
        let user_note = await Notes.findById({_id: id});
        if(!user_note){
            success = false;
            return res.status(404).json({success, message: "no found"});
        }

        console.log(user_note.user);
        console.log(user_data._id);


        if(user_note.user.toString()!==user_data._id.toString()){
            success = false;
            return res.status(404).json({success, message: "not allowed"});
        }

        

        const deleted_note = await Notes.findByIdAndDelete({_id: id}, {new: true});

        // // final
        // success = true;
        res.status(200).json({success, message: "Deleted note successfully", deleted_note})
    } catch (error) {
        console.log("get user's all note error**************");
        console.log(error);
        let success = false;
        res.status(500).json({success, message: "get user's all note error**************"});
    }
});




// router.post("/signup", async(req, res)=>{
//     try {
//         let success = false;
//         const {name, email, password} = req.body;

//         console.log(name);
//         const signup_data = await Users({
//             name,
//             email,
//             password
//         })
//         const save_signup_data = await signup_data.save();
//         console.log(save_signup_data);

//         // token gen
//         const data = {
//             user:{
//                 id:save_signup_data._id
//             }
//         }
//         const token = await jwt.sign(data, jwt_secret_key);

//         // final
//         success = true;
//         res.status(201).json({success, message: "Created Account Successfully", token, save_signup_data})
//     } catch (error) {
//         console.log("signup error**************");
//         console.log(error);
//         let success = false;
//         res.status(500).json({success, message: "signup error**************"});
//     }
// });

module.exports = router;

