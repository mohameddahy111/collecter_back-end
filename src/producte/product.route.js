import express from 'express';
import { auth } from '../middleware/auth/auth.js';
import { addProdect, getAllProdect, getAllProdectDetails } from './producte.controller.js';

const router = express.Router()
router.get('/', getAllProdect)
router.get('/detalis/:id', getAllProdectDetails)

router.post('/:id' , auth , addProdect)
export default router