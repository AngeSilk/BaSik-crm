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

export {
    validateUserByEmail,
    validateUserById,
}