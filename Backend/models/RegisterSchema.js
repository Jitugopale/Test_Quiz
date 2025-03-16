import mongoose, { Schema } from "mongoose";
import { type } from "os";

const RegisterSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}
)

const register = mongoose.model('register',RegisterSchema);
export default register;