import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { Product, produto_tem_photo, Produto_tem_size, Produto_tem_cor } from '../models/product';
import express from 'express';
import auth from '../middleware/auth';
import { Color } from '../models/color';
import { Photo } from '../models/photo';
import { ProdutoSubcategoria } from '../models/ProdutoSubcategoria';
import { ProdutoCategoria } from '../models/ProdutoCategoria';
import ProductResponse from '../types/product';
import { uploadFile } from '../utils/upload';
import { Size } from '../models/size';
const database = require('../config/database');
const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: 'uploads/',
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname);
    },
});
const router = express.Router();

interface MulterRequest extends Request {
    files?: any[];
}
async function getProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;


    const product = await Product.findOne({
        where: { id: id },
        include: [{
            model: ProdutoSubcategoria,
            as: 'produtoSubcategoria',
            include: {
                model: ProdutoCategoria,
                as: 'produtoCategoria',
                where: {
                    id: 1,
                },
            },
        }, {
            model: Photo,
            as: 'photo',
        }, {
            model: Color,
            as: 'color',
        }, {
            model: Size,
            as: 'size',
        }]
    })
    const etste = await transformProducts([product])
    res.status(201).json(etste[0]);
}

async function getProducts(req: Request, res: Response, next: NextFunction) {


    const products = await Product.findAll({
        include: [{
            model: ProdutoSubcategoria,
            as: 'produtoSubcategoria',
            include: {
                model: ProdutoCategoria,
                as: 'produtoCategoria',
                where: {
                    id: 1,
                },
            },
        }, {
            model: Photo,
            as: 'photo',
        }, {
            model: Color,
            as: 'color',
        }, {
            model: Size,
            as: 'size',
        },
        ]
    })
    const etste = await transformProducts(products)
    res.status(201).json(etste);

}
interface UploadedFile {
    originalname: string;
    path: string;
}
const upload = Multer({ dest: 'uploads/' }); // Define o diretório onde os arquivos serão salvos

async function postProduct(req: Request, res: Response, next: NextFunction) {
    const body = JSON.parse(req.body.json) as ProductResponse;
    const files: UploadedFile[] = (req as MulterRequest).files as UploadedFile[]; // Obtém a lista de arquivos enviados
    await Product.create({
        nome: body.nome,
        descricao: body.descricao,
        desativado: body.desativado || false,
        quantity: body.quantity || 0,
        valor_produto: body.valor_produto || 0,
    }).then((newPost: typeof Product) => {
        body.produtoSubcategoria?.map(sub => newPost.setProdutoSubcategoria(sub.id))
        body.tamanhos?.map(sub => Produto_tem_size.create({ produtoId: newPost.id, tamanhoId: sub.id, quantity: sub.quantidade }))
        body.cores?.map(sub => Produto_tem_cor.create({ produtoId: newPost.id, corId: sub.id, quantidade: sub.quantidade }))


        if (files) {
            const uploadPromises = files?.map((file) => uploadFile(file, `${newPost.id}${Date.now()}`));
            Promise.all(uploadPromises)
                .then((fileUrls) => {
                    fileUrls?.map((item: any, index: number) => {
                        Photo.create({ url: item.url, thumbnail: false }).then(async (newPhoto: any) => {
                            produto_tem_photo.create({ produtoId: newPost.id, photoId: newPhoto.id, is_cover: index === 0 })
                        }).catch((e: any) => res.status(400))
                        Photo.create({ url: item.thumbnail, thumbnail: true }).then(async (newPhoto: any) => {
                            produto_tem_photo.create({ produtoId: newPost.id, photoId: newPhoto.id, is_cover: index === 0 })
                        }).catch((e: any) => res.status(400))
                    })
                    res.status(201).json(newPost);
                }).catch(e => res.status(400))
        }
    })

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

router.get('/:id', getProduct);

router.get('/', getProducts);

router.put('/:id', patchProduct);

router.post('/', upload.array('files'), postProduct);


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
            photos: product.photo?.filter((ite: any) => ite.thumbnail === false).map((item: any) => item.url),
            thumbnails: product.photo?.filter((ite: any) => ite.thumbnail === true).map((item: any) => item.url),
            cores: product.color?.map((item: any) => {
                console.log("🚀 ~ file: productController.ts:177 ~ cores:product.color?.map ~ item:", JSON.stringify(item.produto_tem_cor))
                return({
                id: item.id,
                descricao: item.descricao,
                quantidade: item.produto_tem_cor.quantidade
            })}),
            tamanhos: product.size?.map((item: any) => ({
                id: item.id,
                descricao: item.descricao,
                quantidade:item.produto_tem_tamanho.quantity 
            })),
            nome: product.nome,
            valor_produto: product.valor_produto,
            quantity: product.quantity,
            descricao: product.descricao,
        };


        transformedProducts.push(transformedProduct);
    }

    return transformedProducts;
}