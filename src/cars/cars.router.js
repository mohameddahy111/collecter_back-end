import express from 'express';
import { addCar } from './cars.contrllor.js';

const router = express.Router()
router.post('/' , addCar)
export default router