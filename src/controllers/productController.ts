
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';
import { Color } from '../models/color';
const database = require('../config/database');

const router = express.Router();

async function getProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = await Product.findOne({ where: { id: id } });

    if (user)
        res.json(user);
    else
        res.sendStatus(404);
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
    const start = +req.params.start;
    const end = +req.params.end;
    const filter = req.params.filter;

 /*    const products = await Product.findAll({ offset: start, limit: end-start, where: {
        name: database.where(database.fn('LOWER', database.col('name')), 'LIKE', '%' + filter + '%')
    },  include: Color}) */
    const products = await Product.findAll({ offset: start, limit: end-start,  include: Color})
    res.json(products);
}
async function postProduct(req: Request, res: Response, next: NextFunction) {
    const { nome, descricao, desativado, data_desativacao } = req.body;
    const result = await Product.create({
        nome: nome,
        descricao: descricao,
        desativado: desativado || false,
        data_desativacao: data_desativacao || null
    })
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = req.body;
    const result = Product.update(
        user,
        { where: { id: id } }
    )
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const success = await Product.delete({ where: { id: id } })
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}

router.get('/:id', getProduct);

router.get('/:start/:end/:filter', getProducts);

router.put('/:id', patchProduct);
router.post('/',auth, postProduct);

router.delete('/:id', deleteProduct);

export default router;
