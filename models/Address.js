import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    street:{
        type:String,
        required:true
    },
    floor:{
        type:Number
    },
    description: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: [true, 'El número/altura es requerido'],
    },
    zipcode: {
        type: String,
        required: [true, "El Código postal es requerido"],
    },
    status: {
        type: Boolean,
        default: true,
    },
    coordinates:{
        type: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    //To do: Falta roles
}, {
    timestamps: true,
})

const Address = mongoose.model('Address', addressSchema);

export default Address;