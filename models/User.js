import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'El nombre es requerido'],
        trim:true
    },
    lastname:{
        type:String,
        required:[true, 'El apellido es requerido'],
        trim:true
    },
    DNI:{
        type:String,
        required:[true, 'El DNI es requerido'],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true, 'El email es requerido'],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es requerida'],
        trim:true
    },
    google: {
        type: Boolean,
        default: false,
    },
    phone:{
        type:String,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
    // address:[{
    //    type:mongoose.Schema.Types.ObjectId,
    //    ref:"Address",
    //    required:true
    // }],
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema)

export default User
