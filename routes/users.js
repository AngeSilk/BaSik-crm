import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/user.js';
// Middlewares
import { validateFields } from '../middlewares/validate-fields.js';
// Helpers
import {
    validateUserById,
    validateUserByEmail,
} from '../helpers/validate-db.js';

const router = Router();

router.get('/',
    // TODO: Falta validación de usuario (JWT),
    // TODO: Falta validación de role ** requerida para esta ruta **
getUsers);  //Faltan las Middlewares

router.get('/:id', [
    // TODO: Falta validación de usuario (JWT),
    // TODO: Falta validación de role ** requerida para esta ruta **
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateUserById(id) ),
    validateFields,
], getUser);

router.post('/',[
    // TODO: falta validación de usuario (JWT)
    // TODO: Falta validación de role ** requerida para esta ruta **
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('dni', 'El dni es obligatorio').isLength({min: 8, max: 9}),
    check('cuit', 'El cuit es obligatorio').isLength({min: 8, max: 9}),
    check('email', 'El email no tiene un formato válido').isEmail(),
    check('email').custom( email => validateUserByEmail(email) ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 8 digitos').isLength({min: 8}),
    validateFields
], createUser);

router.put('/:id',[
    // TODO: falta validación de usuario (JWT)
    // TODO: falta validación de errores
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateUserById(id)),
    validateFields,
], updateUser);

router.delete('/:id',[
    // TODO: falta validación de usuario (JWT)
    // TODO: falta validación de errores
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateUserById(id)),
    validateFields,
], deleteUser);

export default router;
