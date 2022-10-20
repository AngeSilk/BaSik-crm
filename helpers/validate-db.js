import Product from '../models/Product.js';
import User from '../models/User.js';

const validateUserById = async id => {
    const user = await User.findById(id);

    if(!user) {
        throw new Error(`El id '${id}' no es válido`)
    }

    return true;
}

const validateUserByEmail = async email => {
    const user = await User.findOne({email});

    if(user) {
        throw new Error(`El email '${email}' ya está registrado`);
    }

    return true;
}

const validateProductById = async id => {
    const product = await Product.findById(id);

    if(!product) {
        throw new Error(`El id '${id}' no es válido`)
    }

    return true;

}

export {
    validateUserByEmail,
    validateUserById,
    validateProductById,
}