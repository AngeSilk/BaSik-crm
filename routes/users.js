import { Router } from 'express';

import {
    createUser,
    getUsers
} from '../controllers/user.js';

const router = Router();

router.get('/', getUsers);  //Faltan las Middlewares

router.post('/', createUser);

export default router;
