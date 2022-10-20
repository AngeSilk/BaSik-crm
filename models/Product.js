import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
        type:Number,
        required:[true, 'El precio es requerido'],
        trim:true,
    },
    code:{
        type:String,
        required:[true, 'El codigo es requerido'],
        trim:true
    },
    stock:{
        type:Number,
        default:0,
    },
    status:{
        type:Boolean,
        default:true
    },
    userAdded:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userAdded",
     }],
},
{
    timestamps:true
})

const Product = mongoose.model('Product', productSchema)

export default Product