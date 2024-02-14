

import express from 'express';
import { addCost } from './cost.controller.js';

const router = express.Router()
router.post('/:id' , addCost)
export default router