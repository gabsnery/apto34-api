
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';
import { Color } from '../models/color';
import { ProdutoSubcategoria } from '../models/ProdutoSubcategoria';
import { ProdutoCategoria } from '../models/ProdutoCategoria';
import ProductResponse from 'src/types/product';
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
    const products = await Product.findAll({
        offset: start, limit: end - start, include: {
            model: ProdutoSubcategoria,
            as: 'produtoSubcategoria',
            include: {
                model: ProdutoCategoria,
                as: 'produtoCategoria',
                where: {
                    id: 1,
                },
            },
        },
    })
    const etste = await transformProducts(products)
    res.status(201).json(etste);

}
async function postProduct(req: Request<{}, {}, ProductResponse>, res: Response, next: NextFunction) {
    const body = req.body;
    const result = await Product.create({
        nome: body.nome,
        descricao: body.descricao,
        desativado: body.desativado || false,
        valor_produto: body.valor_produto || 0,
    }).then((newPost: typeof Product) => {
        return body.produtoSubcategoria.map(sub => newPost.setProdutoSubcategoria(sub.id))
    })
    if (result) {
        res.status(201).json(result);
    } else
        res.status(400);
}

async function patchProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = req.body;
    const result = Product.update(
        user,
        { where: { id: id } }
    )
    if (result)
        res.json(transformProducts(result));
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
router.post('/', auth, postProduct);


export default router;


async function transformProducts(products: any[]): Promise<ProductResponse[]> {
    const transformedProducts: ProductResponse[] = [];

    for (const product of products) {
        const transformedSubcategories: ProductResponse['produtoSubcategoria'] = [];

        for (const subcategoria of product.produtoSubcategoria) {
            const transformedSubcategory: ProductResponse['produtoSubcategoria'][number] = {
                id: subcategoria.id,
                subcategoria: subcategoria.subcategoria,
                descricao_subcategoria: subcategoria.descricao_subcategoria,
                categoria: {
                    id: subcategoria.produtoCategoria.id,
                    categoria: subcategoria.produtoCategoria.categoria,
                    descricao_categoria: subcategoria.produtoCategoria.descricao_categoria,
                },
            };

            transformedSubcategories.push(transformedSubcategory);
        }

        const transformedProduct: ProductResponse = {
            id: product.id,
            produtoSubcategoria: transformedSubcategories,
            nome: product.nome,
            valor_produto: product.valor_produto,
            descricao: product.descricao,
        };

        transformedProducts.push(transformedProduct);
    }

    return transformedProducts;
}