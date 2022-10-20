import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: false
    },
    lastname:{
        type:String,
        trim:true
    },
    dni:{
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
    address: [{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Address",
    }],
    role: { // TO DO: faltan declarar roles,
        type: String,
        enum: {
            values: ['SUPER_ADMIN','ADMIN', 'STAFF', 'CLIENT'],
            message: '{VALUE} no es rol válido',
        },
        default: 'client'
    },
    regToken: {
        type: String,
        required: true,
    }
},{
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const { password, status, __v, ...user} = this.toObject()
    return user
}

const User = mongoose.model('User', userSchema)

export default User
