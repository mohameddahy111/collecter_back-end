import express from 'express';
import { addCar, getAllCars } from './cars.contrllor.js';

const router = express.Router()
router.get('/' , getAllCars)
router.post('/', addCar)
export default router