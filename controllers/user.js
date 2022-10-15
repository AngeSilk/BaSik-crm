//import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import User  from "../models/User.js";

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

const createUser = async (req=Request, res=Response) => {

    const {password, ...user} = req.body;  //Desestructuracion del objeto body con operador REST

    const salt = bcryptjs.genSaltSync(10)

    user.password = bcryptjs.hashSync(password, salt)

    try {

        const newUser = new User(user);

        await newUser.save()

        res.status(201).json({
            msg: "Usuario creado correctamente",
            user:newUser
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

    /* Validación realizada en el middleware */
    // const userExist = await User.findById(id)

    // if (!userExist) {
    //     res.status(400).json({
    //         msg: "Bad request -User Not Exist"
    //     })
    // }

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
    getUsers, getUser, createUser, updateUser, deleteUser
}