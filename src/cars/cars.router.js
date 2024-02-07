import express from 'express';
import { addCar, getAllCars } from './cars.contrllor.js';
import { auth } from '../middleware/auth/auth.js';

const router = express.Router()
router.get('/' , getAllCars)
router.post('/', auth, addCar)
export default router