

import express from 'express';
import { addCost } from './cost.controller.js';

const router = express.Router()
router.post('/' , addCost)
export default router