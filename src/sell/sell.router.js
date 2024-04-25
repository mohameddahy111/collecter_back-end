import express from 'express';
import { addSell } from './sell.controller.js';

const router = express.Router()
router.post('/:id'  , addSell)
export default router