
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import auth from '../middleware/auth';
import { ProdutoCategoria } from '../models/ProdutoCategoria';
const database = require('../config/database');

const router = express.Router();



async function getCategories(req: Request, res: Response, next: NextFunction) {

    const colors = await ProdutoCategoria.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
    res.json(colors);
}



router.get('/', getCategories);



export default router;
