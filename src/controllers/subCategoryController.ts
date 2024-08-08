import { Request, Response, NextFunction } from "express";
import express from "express";
import auth from "../middleware/auth";
import { Color } from "../models/color";
import { ProdutoSubcategoria } from "../models/ProdutoSubcategoria";
import { ProdutoCategoria } from "../models/ProdutoCategoria";
import { ProdutoSubcategoriaResponse } from "../types/subcategory";
import { Category } from "../types/category";
const database = require("../config/database");

const router = express.Router();

async function getSubcategorias(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = +req.params.start;
  const end = +req.params.end;
  const filter = req.params.filter;

  /*    const products = await Product.findAll({ offset: start, limit: end-start, where: {
           name: database.where(database.fn('LOWER', database.col('name')), 'LIKE', '%' + filter + '%')
       },  include: Color}) */
  const subs = await ProdutoSubcategoria.findAll({
    include: {
      model: ProdutoCategoria,
      as: "produtoCategoria",
    },
  });
  const etste = await transformValue(subs);
  res.status(201).json(etste);
}

router.get("/", getSubcategorias);

export default router;

async function transformValue(
  subcategories: any[]
): Promise<ProdutoSubcategoriaResponse[]> {
  const transformedProducts: ProdutoSubcategoriaResponse[] = [];

  for (const sub of subcategories) {
    const transformedSubcategory: Category = {
      id: sub.produtoCategoria.id,
      categoria: sub.produtoCategoria.categoria,
      descricao_categoria: sub.produtoCategoria.descricao_categoria,
    };

    const transformedProduct: ProdutoSubcategoriaResponse = {
      id: sub.id,
      categoria: transformedSubcategory,
      subcategoria: sub.subcategoria,
      descricao_subcategoria: sub.descricao_subcategoria,
    };

    transformedProducts.push(transformedProduct);
  }

  return transformedProducts;
}
