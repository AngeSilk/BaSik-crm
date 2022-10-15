import { Router } from 'express';
import { check } from 'express-validator';

// Controllers
import {
    createProducts,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controllers/product';