
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';

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
    const products = await Product.findAll()
    res.json(products);
}
async function postProduct(req: Request, res: Response, next: NextFunction) {
    const { name, description, desativado, date_deactivated } = req.body;
    const result = await Product.create({
        name: name,
        description: description,
        desativado: desativado || false,
        date_deactivated: date_deactivated || null
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

router.get('/', getProducts);

router.put('/:id', patchProduct);
router.post('/',auth, postProduct);

router.delete('/:id', deleteProduct);

export default router;
