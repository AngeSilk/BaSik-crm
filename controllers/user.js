//import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import bcryptjs from "bcryptjs"
import User  from "../models/User.js";
import * as jwt from '../helpers/jwt.js';

const getUsers = async (req=Request, res=Response) => {

    const users = await User.find({status: true})

    res.status(200).json({
        users
    })
}

const getUser = async(req=Request, res=Response) => {

    const {id} = req.params

    const user = await User.findById(id)

    res.status(200).json({
        user
    })
}

const registerUserStepOne = async (req = Request, res = Response ) => {
    // En el middleware se valida los parametro desestructurados en el body
    const { email, role, dni } = req.body;

    // Creamos un uuid único q funcionaría como token de registro
    const regToken = uuid();

    const user = new User({
        email,
        role,
        regToken,
        dni
    });

    try {
        await user.save({validateBeforeSave: true});
        res.status(201).json({
            msg: 'Primer paso realizado, usuario registro e correo con link enviado',
            user,
        });
    } catch (error) {
        // throw new Error(error);
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

// dev endpoint
const registerUserSuperAdmin = async (req, res) => {

    const { email, role, dni, name, lastname, password } = req.body;

    // Creamos un uuid único q funcionaría como token de registro
    const regToken = uuid();

    const user = new User({
        email,
        role,
        regToken,
        dni,
        name, 
        lastname,
        password,
    });

    try {
        await user.save();

        const token = await jwt.signJwt( user._id );

        res.status(201).json({
            msg: 'Usuario administrador creado, SOLO VALIDO PARA DEV',
            user,
            token,
        });
    } catch (error) {
        // throw new Error(error);
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }

}

const registerUserStepTwo = async (req=Request, res=Response) => {

    const { id } = req.params;

    const {
        password,
        regToken,
        status,
        _id,
        ...user} = req.body;  //Desestructuracion del objeto body con operador REST

    const userExists = await User.findOne({regToken});

    if(!userExists) {
        return res.status(400).json({
            msg: 'Bad Request - registration token expired or already user'
        });
    }

    if(userExists._id.toString() !== id.toString()) {
        return res.status(400).json({
            msg: 'Bad Request - the ids do not match'
        });
    }

    // Una vez validado los items
    // anteriores eliminamos el regToken del usuario (expiró)
    user.regToken = '';

    // Hasheo de password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    try {
        const userRegister = await User.findByIdAndUpdate(
            id,
            user,
            { new: true }
        );

        // TO DO: crear jsonwebtoken y enviar por res

        res.status(201).json({
            msg: "Usuario creado correctamente",
            user: {
                _id: userRegister._id,
                name: userRegister.name,
                lastname: userRegister.lastname,
                role: userRegister.role,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateUser = async(req=Request, res=Response) => {

    const {id} = req.params

    const {_id, password, status, ...user} = req.body

    Object.keys(user).forEach( key => {
        (!user[key] || user[key] === '') && delete user[key]
    })

    if (password){
        const salt = bcryptjs.genSaltSync(10)
        user.password = bcryptjs.hashSync(password, salt)
    }

    try {

        const newUser = await User.findByIdAndUpdate(
            id, user, {new:true}
        )

        res.status(201).json({
            user:newUser,
            msg: "Usuario actualizado correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

const deleteUser = async(req=Request, res=Response) => {

    const {id} = req.params

    /* Validación realizada en el middleware */
    // const userExist = await User.findById(id)

    // if (!userExist) {
    //     res.status(400).json({
    //         msg: "Bad request -User Not Exist"
    //     })
    // }

    try {

        const delUser = await User.findByIdAndUpdate(
            id, {status:false}, {new:true}
        )

        res.status(200).json({
            msg: "Usuario eliminado correctamente",
            user:delUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

export {
    getUsers, 
    getUser, 
    registerUserStepOne,
    registerUserStepTwo,
    registerUserSuperAdmin,
    updateUser, 
    deleteUser
}