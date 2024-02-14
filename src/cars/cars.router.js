import express from 'express';
import { addCar, getAllCarDetails, getAllCars, updateCarInfo } from './cars.contrllor.js';
import { auth } from '../middleware/auth/auth.js';

const router = express.Router()
router.get('/' , getAllCars)
router.get('/:id' , getAllCarDetails)
router.post('/', auth, addCar)
router.put('/:id', updateCarInfo)
export default router