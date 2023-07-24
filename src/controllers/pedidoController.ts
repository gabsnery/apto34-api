
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';
import { Size } from '../models/size';
const database = require('../config/database');

const router = express.Router();


async function postPedido(req: Request, res: Response, next: NextFunction) {
  

}

async function getPedidos(req: Request, res: Response, next: NextFunction) {
    const sizes = await Size.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
    res.json(sizes);
}



router.get('/', getPedidos);
router.post('/', postPedido);



export default router;
