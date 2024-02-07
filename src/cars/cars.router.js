import express from 'express';
import { addCar, addProdect, getAllCars } from './cars.contrllor.js';
import { auth } from '../middleware/auth/auth.js';

const router = express.Router()
router.get('/' , getAllCars)
router.post('/', auth, addCar)
,router.put('/add_prodect/:id' ,addProdect )
export default router