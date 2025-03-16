
import { response } from "express";
import register from "../models/RegisterSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'Roman$isgood';

export const RegisterController = async(req,res)=>{
    const {email, password, Name} = req.body;
    try {
        if(!email||!password||!Name){
            return res.status(400).json({message:"Email,password, Name Reqyuired"});
        }

        const alreadyRegister = await register.findOne({email})
        if(alreadyRegister){
            return res.status(200).json({
                status:"Success",
                message:"User already registered",
                data:alreadyRegister,
            });
        }


        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password,salt)

        const newData = new register({
            email:email,
            password:hashPass,
            Name:Name
        })
        await newData.save();
        
        const data = {id : newData.id}
        const token = jwt.sign(data,JWT_SECRET)
        
        console.log(token)

        res.status(200).json({message:"User Register Sucessfully",Token:token});




    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }

}

export const LoginController = async(req,res)=>{
    const {email,password}=req.body;
    const token = req.headers['authorization'];

    try {
        const user = await register.findOne({email});

        if(!user){
            return res.status(401).json("Invalid Credentials")
        }

        if(!token){
            return res.status(403).json("Token Not Found")
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded);

        const data = { id:user.id}
        const authToken = jwt.sign(data,JWT_SECRET)
        console.log(authToken)



        const isValidPassword = await bcrypt.compare(password,user.password);
        if(isValidPassword){
            return res.status(200).json({message:"Login Sucessfully",GetToken:authToken});
        }else{
            return res.json({message:"Invalid Credentials"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export const getAlldata = async(req,res)=>{
    try {
        const user = await register.find();
        return res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Internal Server Error")
    }
}

export const getAll = async(req,res)=>{
    try {
        const userId = req.user.id;

        const user = await register.findById(userId).select("-password");
        return res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Internal Server Error")
    }
}