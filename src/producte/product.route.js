import express from 'express';
import { auth } from '../middleware/auth/auth.js';
import { addProdect, getAllProdect } from './producte.controller.js';

const router = express.Router()
router.get('/', getAllProdect)

router.post('/:id' , auth , addProdect)
export default router