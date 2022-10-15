import express from "express"
import cors from "cors"
import { dbConnection } from "../settings/db.js";

// Rutas
import users from '../routes/users.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.paths = {
            users: "/api/users"
        }
        this.connect()
        this.middlewares()
        this.routes();
    }

    async connect(){
        await dbConnection()
    }

    routes(){
        this.app.use(this.paths.users, users);
    }

    middlewares(){
        this.app.use(express.json({extended: true}));
    }

    exec(){
        this.app.listen(this.port, "0.0.0.0", () => {
            console.log(`Hola servidor corriendo en el ${this.port}`)
        })
    }
}


export {Server}