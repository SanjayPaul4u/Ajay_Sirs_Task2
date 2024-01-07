const express = require("express");
const Users = require("../model/userModel");
const jwt = require("jsonwebtoken");


const jwt_secret_key = "ajaysirstask123"

const router = express.Router();
router.post("/login", async(req, res)=>{
    try {
        let success = false;
        const {email, password} = req.body;
        let user_data = await Users.findOne({email});
        if(!user_data ){
            success = false;
            return res.status(400).json({success, message: "email not match****"});
        }
        user_data = await Users.findOne({password});
        if(!user_data){
            success = false;
            return res.status(400).json({success, message: "password not match****"});
        }


         // token gen
         const data = {
            user:{
                id:user_data._id
            }
        }
        const token = await jwt.sign(data, jwt_secret_key);

        // final
        success = true;
        res.status(200).json({success, message: "Loged in Successfully", token, user_data})
    } catch (error) {
        console.log("login error**************");
        console.log(error);
        let success = false;
        res.status(500).json({success, message: "login error**************"});
    }
});

router.post("/signup", async(req, res)=>{
    try {
        let success = false;
        const {name, email, password} = req.body;

        console.log(name);
        const signup_data = await Users({
            name,
            email,
            password
        })
        const save_signup_data = await signup_data.save();
        console.log(save_signup_data);

        // token gen
        const data = {
            user:{
                id:save_signup_data._id
            }
        }
        const token = await jwt.sign(data, jwt_secret_key);

        // final
        success = true;
        res.status(201).json({success, message: "Created Account Successfully", token, save_signup_data})
    } catch (error) {
        console.log("signup error**************");
        console.log(error);
        let success = false;
        res.status(500).json({success, message: "signup error**************"});
    }
});

module.exports = router;

