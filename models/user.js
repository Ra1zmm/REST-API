import mongoose from "mongoose";
import validator from "validator";


const UserSchema = new mongoose.Schema({
    fullName :{
        type : String,
        require : true,
        unique : true
    },
    email:{
        type: String,
        required : true,
        validate: (value) => {
            return validator.isEmail(value);
          }
    },
    addres:{
        type: String,
        required : true
    },
    phoneNUmber:{
        type: Number,
    }
});


export default mongoose.model('User',UserSchema)