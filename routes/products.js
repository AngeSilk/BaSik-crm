import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controllers/product';

import { validateFields } from '../middlewares/validate-fields.js';
// Helpers
import {
    validateProductById,
} from '../helpers/validate-db.js';

const router = Router();

router.get('/',
    // TODO: Falta validación de producto,
getProducts);  //Faltan las Middlewares

router.get('/:id', [
    // TODO: Falta validación de producto,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateProductById(id) ),
    validateFields,
], getProduct);

router.post('/',[
    // TODO: falta validación de productos
    // TODO: Falta validación de role ** requerida para esta ruta **
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('code', 'El codigo es requerido').not().isEmpty(),
    validateFields
], createProduct);

router.put('/:id',[
    // TODO: falta validación de productos
    // TODO: falta validación de errores
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateProductById(id)),
    validateFields,
], updateProduct);

router.delete('/:id',[
    // TODO: falta validación de productos
    // TODO: falta validación de errores
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( id => validateProductById(id)),
    validateFields,
], deleteProduct);

export default router;