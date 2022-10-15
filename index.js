import dotenv from "dotenv"

import { Server } from "./server/index.js"

dotenv.config() //Configuracion de variables de entorno.

const server = new Server()
server.exec()
