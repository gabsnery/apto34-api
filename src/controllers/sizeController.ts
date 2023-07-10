
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';
import { Size } from '../models/size';
const database = require('../config/database');

const router = express.Router();



async function getSizes(req: Request, res: Response, next: NextFunction) {

    const sizes = await Size.findAll()
    res.json(sizes);
}



router.get('/', getSizes);



export default router;
