import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'El nombre del producto es requerido'],
        trim:true
    },
    description:[{
        type:String,
        trim:true,
    }],
    images:[{
        type:String
    }],
    price:{
        type:number,
        required:[true, 'El precio es requerido'],
        trim:true,
    },
    code:{
        type:String,
        required:[true, 'El codigo es requerido'],
        trim:true
    },
    stock: {
        type: Number,
        default: 0,
    },
    status:{
        type:Boolean,
        default:true
    },
},
{
    timestamps:true
})

const Product = mongoose.model('Product', userSchema)

export default Product