import express from 'express';
import { auth } from '../middleware/auth/auth.js';
import { addProdect } from './producte.controller.js';

const router = express.Router()
router.post('/:id' , auth , addProdect)
export default router