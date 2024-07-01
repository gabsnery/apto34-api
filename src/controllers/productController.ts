import { Storage } from '@google-cloud/storage';
import express, { NextFunction, Request, Response } from 'express';
import { ProdutoCategoria } from '../models/ProdutoCategoria';
import { ProdutoSubcategoria } from '../models/ProdutoSubcategoria';
import { Color } from '../models/color';
import { Photo } from '../models/photo';
import { Product, Produto_tem_cor, Produto_tem_size, produto_tem_photo } from '../models/product';
import { Size } from '../models/size';
import ProductResponse from '../types/product';
import { uploadFileGoogleStorage } from '../utils/upload';
import { decryptId, encryptId } from '../utils/encrypt';
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
// Configurações do Google Cloud Storage
const cloudStorage = new Storage({
    keyFilename: process.env.GOOGLE_STORAGE_KEYFILENAME,
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME || ''; // Nome do seu bucket no Google Cloud Storage

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
            where: req.query.type ? {
                id: req.query.type || []
            } : {},
            include: {
                model: ProdutoCategoria,
                as: 'produtoCategoria',
                where: req.query.category ? {
                    id: req.query.category || []
                } : {},
            },
        }, {
            model: Photo,
            as: 'photo',
        }, {
            model: Color,
            as: 'color',
            where: req.query.color ? {
                id: req.query.color || []
            } : {},
            required: !!req.query.color
        }, {
            model: Size,
            as: 'size',
            where: req.query.size ? {
                id: req.query.size || []
            } : {},
            required: !!req.query.size
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
            const uploadPromises = files?.map(async (file) => await uploadFileGoogleStorage(file, `${newPost.id}${Date.now()}`));
            Promise.all(uploadPromises)
                .then((fileUrls) => {
                    fileUrls?.map((item: any, index: number) => {
                        Photo.create({ url: item.url, thumbnail: false,file_name:item.fileName,host:item.host }).then(async (newPhoto: any) => {
                            produto_tem_photo.create({ produtoId: newPost.id, photoId: newPhoto.id, is_cover: index === 0 })
                        }).catch((e: any) => res.status(400))
                        Photo.create({ url: item.thumbnail, thumbnail: true,file_name:item.thumbFileName,host:item.host  }).then(async (newPhoto: any) => {
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
const getLocalImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    console.log('entrou aqui')
    const photo = Photo.findOne({
        where: { id: decryptId(id) }})
    console.log("🚀 ~ getLocalImage ~ photo:", photo)
    try {
        const [url] = await cloudStorage.bucket(bucketName).file('1831689900393785-diminuido.jpg').getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
        });
        res.json({ url: url });
      } catch (error:any) {
        throw new Error(`Erro ao gerar a URL assinada: ${error.message}`);
      }
/* 
  const fullPath = path.join(__dirname, '../rebelmoon.jpg');
  const [url] = await storage.bucket(bucketName).file(filename).getSignedUrl(options);

  // Verifica se a imagem existe
  fs.stat(fullPath, (err:any, stats:any) => {
    if (err || !stats.isFile()) {
      res.status(404).send('Imagem não encontrada');
      return;
    }

    // Define o tipo de conteúdo como imagem e envia o arquivo
    res.sendFile(fullPath);
  }); */
};


router.get('/image', getLocalImage);
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
            photos: product.photo?.filter((ite: any) => ite.thumbnail === false).map((item: any) => encryptId(item.id.toString())),
            thumbnails: product.photo?.filter((ite: any) => ite.thumbnail === true).map((item: any) => item.url),
            cores: product.color?.map((item: any) => {
                return ({
                    id: item.id,
                    descricao: item.descricao,
                    quantidade: item.produto_tem_cor.quantidade
                })
            }),
            tamanhos: product.size?.map((item: any) => ({
                id: item.id,
                descricao: item.descricao,
                quantidade: item.produto_tem_tamanho.quantity
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