import User  from "../models/User.js";

const getUsers = async (req, res) => {

    res.status(200).json({
        msg: 'Todo ok'
    })
}

const createUser = async (req = Request, res) => {

    console.log(req.body);

    const user = new User(req.body)

    await user.save()

    res.status(200).json({
        msg: "Creando usuario Angelo",
        user
    })
}

export {
    getUsers, createUser
}