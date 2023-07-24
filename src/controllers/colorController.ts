
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import auth from '../middleware/auth';
import { Color } from '../models/color';
const database = require('../config/database');

const router = express.Router();



async function getColors(req: Request, res: Response, next: NextFunction) {

    const colors = await Color.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
    res.json(colors);
}



router.get('/', getColors);



export default router;
