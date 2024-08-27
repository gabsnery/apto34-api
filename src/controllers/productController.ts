import { Storage } from "@google-cloud/storage";
import express, { NextFunction, Request, Response } from "express";
import { ProdutoCategoria } from "../models/ProdutoCategoria";
import { ProdutoSubcategoria } from "../models/ProdutoSubcategoria";
import { Color } from "../models/color";
import { Photo } from "../models/photo";
import { Product, Stock, produto_tem_photo } from "../models/product";
import { Size } from "../models/size";
import ProductResponse from "../types/product";
import { uploadFileGoogleStorage } from "../utils/upload";
import { decryptId, encryptId } from "../utils/encrypt";
import transformProducts from "../dtos/Product";
import Sequelize, { literal } from "sequelize";
import { group } from "console";

const { Op } = require("sequelize");

const database = require("../config/database");
const Multer = require("multer");

const storage = Multer.diskStorage({
  destination: "uploads/",
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
  credentials: JSON.parse(process.env.GOOGLE_STORAGE_KEYFILENAME || "") || {},
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME || ""; // Nome do seu bucket no Google Cloud Storage

async function getProduct(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  const product = await Product.findOne({
    where: { id: id },
    include: [
      {
        model: ProdutoSubcategoria,
        as: "produtoSubcategoria",
        include: {
          model: ProdutoCategoria,
          as: "produtoCategoria",
          where: {
            id: 1,
          },
        },
      },
      {
        model: Photo,
        as: "photo",
      },
      {
        model: Color,
        as: "color",
      },
      {
        model: Size,
        as: "size",
      },
    ],
  });
  const etste = await transformProducts([product]);
  res.status(201).json(etste[0]);
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  const start = req.params.start;
  const count = req.params.count;
  const discount = req.query.discount;
  console.log("🚀 ~ getProducts ~ discount:", discount);
  let whereClause = {};
  if (req.query.category)
    whereClause = {
      ...whereClause,
      ["$produtoSubcategoria.produtoCategoria.id$"]: req.query.category,
    };
  if (discount)
    whereClause = {
      ...whereClause,
      discount: {
        [Sequelize.Op.gte]: +discount,
      },
    };

  const products = await Product.findAll({
    order: [["createdAt", "DESC"]],
    subQuery: false,
    offset: +start,
    limit: +count,
    where: whereClause,
    include: [
      {
        model: ProdutoSubcategoria,
        as: "produtoSubcategoria",
        required: true,
        where: req.query.type
          ? {
              id: req.query.type || [],
            }
          : undefined,
        include: {
          model: ProdutoCategoria,
          as: "produtoCategoria",
          required: true,
        },
      },
      {
        model: Stock,
        as: "stock_product",
        required: true,
        where: {
          colorId: [2, 3],
          sizeId: [2, 3],
        },
      },
      {
        model: Photo,
        as: "photo",
      },
    ],
    group: ["produto.id"], // Agrupa por produto
    having: Sequelize.literal("SUM(stock_product.quantity) > 0"), // Filtra produtos com soma de estoque > 0
    attributes: {
      include: [
        [
          Sequelize.fn("SUM", Sequelize.col("stock_product.quantity")),
          "totalStock",
        ], // Inclui o total do estoque como atributo
      ],
    },
  });
  const count_prod = await Product.count({
    order: [["createdAt", "DESC"]],
    subQuery: false,
    where: whereClause,
    include: [
      {
        model: ProdutoSubcategoria,
        as: "produtoSubcategoria",
        required: true,
        where: req.query.type
          ? {
              id: req.query.type || [],
            }
          : undefined,
        include: {
          model: ProdutoCategoria,
          as: "produtoCategoria",
          required: true,
        },
      },
      {
        model: Stock,
        as: "stock_product",
        required: true,
        where: {
          colorId: [2, 3],
          sizeId: [2, 3],
        },
      },
      {
        model: Photo,
        as: "photo",
      },
    ],
    group: ["produto.id"], // Agrupa por produto
    having: Sequelize.literal("SUM(stock_product.quantity) > 0"), // Filtra produtos com soma de estoque > 0
    attributes: {
      include: [
        [
          Sequelize.fn("SUM", Sequelize.col("stock_product.quantity")),
          "totalStock",
        ], // Inclui o total do estoque como atributo
      ],
    },
  });
  const etste = await transformProducts(products);
  res.status(201).json({products:etste,total_count:count_prod.length});
}
interface UploadedFile {
  originalname: string;
  path: string;
}
const upload = Multer({ dest: "uploads/" }); // Define o diretório onde os arquivos serão salvos

async function postProduct(req: Request, res: Response, next: NextFunction) {
  const body = JSON.parse(req.body.json) as ProductResponse;
  const files: UploadedFile[] = (req as MulterRequest).files as UploadedFile[]; // Obtém a lista de arquivos enviados
  await Product.create({
    nome: body.nome,
    descricao: body.descricao,
    desativado: body.desativado || false,
    quantity: body.quantity || 0,
    valor_produto: body.valor_produto || 0,
  })
    .then(async (newPost: typeof Product) => {
      body.produtoSubcategoria?.map((sub) =>
        newPost.setProdutoSubcategoria(sub.id)
      );
      await Size.findAll().then((sizes: (typeof Size)[]) => {
        console.log("🚀 ~ Size.findAll ~ size:", sizes);
        for (const size of sizes) {
          Color.findAll().then((colors: (typeof Color)[]) => {
            console.log("🚀 ~ Color.findAll ~ color:", colors);
            for (const color of colors) {
              Stock.create({
                productId: newPost.id,
                colorId: color.id,
                sizeId: size.id,
                quantity: 2,
              });
            }
          });
        }
      });
      if (files) {
        const uploadPromises = files?.map(
          async (file, index) =>
            await uploadFileGoogleStorage(
              file,
              `${newPost.id}${Date.now()}${index}`
            )
        );
        Promise.all(uploadPromises)
          .then((fileUrls) => {
            fileUrls?.map((item: any, index: number) => {
              Photo.create({
                url: item.url,
                thumbnail: false,
                file_name: item.fileName,
                host: item.host,
              })
                .then(async (newPhoto: any) => {
                  produto_tem_photo.create({
                    produtoId: newPost.id,
                    photoId: newPhoto.id,
                    is_cover: index === 0,
                  });
                })
                .catch((e: any) => res.status(400));
              Photo.create({
                url: item.thumbnail,
                thumbnail: true,
                file_name: item.thumbFileName,
                host: item.host,
              })
                .then(async (newPhoto: any) => {
                  produto_tem_photo.create({
                    produtoId: newPost.id,
                    photoId: newPhoto.id,
                    is_cover: index === 0,
                  });
                })
                .catch((e: any) => res.status(400));
            });
            res.status(201).json(newPost);
          })
          .catch((e) => res.status(400));
      }
    })
    .catch((erro: any) => {
      res.status(400).json(erro);
    });
}

async function patchProduct(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const user = req.body;
  const result = Product.update(user, { where: { id: id } });
  if (result) res.json(transformProducts(result));
  else res.sendStatus(404);
}
const getLocalImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = decodeURI(req.params.id);
  const photo = await Photo.findOne({
    where: { id: decryptId(id) },
  });
  try {
    const [url] = await cloudStorage
      .bucket(bucketName)
      .file(photo.file_name)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
      });
    res.json({ url: url });
  } catch (error: any) {
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
const getCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = decodeURI(req.params.id);
  const photo = await Photo.findOne({
    include: [{
      model: Product,
      required: true,
      as:'product',
      through: {
              where: {
                produtoId: {[Sequelize.Op.eq]: id },
                is_cover:true
              }
          }
      }
  ]
  });
  console.log("🚀 ~ photo:", photo);
  try {
    const [url] = await cloudStorage
      .bucket(bucketName)
      .file(photo.file_name)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
      });
    res.json({ url: url });
  } catch (error: any) {
    res.json({ url: '' });
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

router.get("/image/:id", getLocalImage);
router.get("/:id", getProduct);
router.get("/cover/:id", getCoverImage);

router.get("/:start/:count", getProducts);

router.put("/:id", patchProduct);

router.post("/", upload.array("files"), postProduct);

export default router;
