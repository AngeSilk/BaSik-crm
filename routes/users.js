import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
    registerUserStepOne,
    registerUserStepTwo,
    registerUserSuperAdmin,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/user.js';
// Middlewares
import { validateFields } from '../middlewares/validate-fields.js';
import {
    validateJWT
} from '../middlewares/validate-jwt.js'
// Helpers
import { validateWithAlwRoles, validateSuperAdminRole } from '../middlewares/validate-roles.js';
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

// TO DO: corregir checks
router.put('/register/step-two/:id',[
    // TODO: falta validación de usuario (JWT)
    // TODO: Falta validación de role ** requerida para esta ruta **
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 8 digitos').isLength({min: 8}),
    check('regToken', 'El token de registro no es válido').isUUID(),
    validateFields
], registerUserStepTwo);

router.post('/register/step-one/', [
    validateJWT,
    validateSuperAdminRole,
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email no tiene un formato válido').isEmail(),
    check('dni', 'El dni es válido').not().isEmpty(),
    check('role').custom( role => validateWithAlwRoles(role) ),
    validateFields,
], registerUserStepOne);

router.post('/register/admin/dev/', registerUserSuperAdmin);

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
