import { Request, Response, NextFunction } from "express";
import { Product, Stock } from "../models/product";
import express from "express";
import auth from "../middleware/auth";
import { Size } from "../models/size";
import PedidoRequest from "../types/pedido";
import { Pedido, PedidoStatus, PedidoTemProdutos } from "../models/pedido";
import { Address } from "../models/adress";
import { Deliver } from "../models/deliver";
import transformOrder from "../dtos/Order";
import { Client } from "../models/client";
import { FiscalNote } from "../models/nota";
import { Payment } from "../models/payment";
import { changeStatus } from "../utils/changeOrderStatus";
import Sequelize, { literal, where } from "sequelize";

const database = require("../config/database");
const jwt = require("jsonwebtoken");

const router = express.Router();

async function postPedido(req: Request, res: Response, next: NextFunction) {
  const body = req.body as PedidoRequest;
  await Address.create({
    cep: body.endereco.cep,
    logradouro: body.endereco.logradouro,
    numero: body.endereco.numero,
    complemento: body.endereco.complemento,
    bairro: body.endereco.bairro,
    id_cidade: 1,
  })
    .then(async (newAddress: typeof Address) => {
      Deliver.create({
        id_entrega_status: 1,
        valor_frete: 111,
        codigo_rastreio: "",
        idEndereco: newAddress.id,
        data_entrega_inicio: Date.now(),
        data_entrega_previsao: Date.now(),
        entrega_concluida: false,
        idTransportadora: 1,
        idTelefone: 1,
      })
        .then(async (newDeliver: typeof Deliver) => {
          let pedidoStatus = await PedidoStatus.findOne({
            where: { status_pedido: "Em analise" },
          });
          Pedido.create({
            idPedidoStatus: pedidoStatus.id,
            data_pedido_realizado: Date.now(),
            idCliente: body.clienteId,
            idEntrega: newDeliver.id,
            pedido_concluido: false,
            total: body.total,
          })
            .then(async (newOrder: typeof Pedido) => {
              const products_count = body.produtos.length;
              console.log("🚀 ~ .then ~ body.produtos:", body.produtos);
              for (let i = 0; i < products_count; i++) {
                await PedidoTemProdutos.create({
                  quantidade: body.produtos[i].quantidade,
                  idProduto: body.produtos[i].id,
                  desconto: 0,
                  idSize: body.produtos[i].idSize,
                  idColor: body.produtos[i].idColor,
                  idPedido: newOrder.id,
                });
                await Stock.findOne({
                  where: {
                    productId: body.produtos[i].id,
                    colorId: body.produtos[i].idColor,
                    sizeId: body.produtos[i].idSize,
                  },
                }).then((stock: typeof Stock) => {
                  console.log("🚀 ~ ).then ~ stock:", stock);
                  stock.update(
                    {
                      where: {
                        id: stock.id,
                      },
                    },
                    {
                      quantity: Sequelize.literal(
                        "quantity - " + body.produtos[i].quantidade.toString()
                      ),
                      reserved_quantity: Sequelize.literal(
                        "reserved_quantity + " +
                          body.produtos[i].quantidade.toString()
                      ),
                    }
                  );
                });
              }
              res.status(201).json(newOrder);
            })
            .catch((e: any) => {
              console.log("🚀 postPedido error c1:", e);
              res.status(400).json(e);
            });
        })
        .catch((e: any) => {
          console.log("🚀 postPedido error c2:", e);
          res.status(400).json(e);
        });
    })
    .catch((e: any) => {
      console.log("🚀 postPedido error c2:", e);
      res.status(400).json(e);
    });
}

const getPedidos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    (req as any).token = decoded;
    const clientId = decoded.user_id;
    const pedidos = await Pedido.findAll({
      where: { idCliente: clientId },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: Client,
          as: "cliente",
        },
        {
          model: FiscalNote,
          as: "notaFiscal",
        },
        {
          model: Payment,
          as: "pagamento",
        },
        {
          model: Product,
          as: "products",
        },
      ],
    });
    const etste = await transformOrder(pedidos);
    res.status(201).json(etste);
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
async function getPedido(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  const pedidos = await Pedido.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: [
      {
        model: Client,
        as: "cliente",
      },
      {
        model: FiscalNote,
        as: "notaFiscal",
      },
      {
        model: Payment,
        as: "pagamento",
      },
      {
        model: Payment,
        as: "pagamento",
      },
      {
        model: Product,
        as: "products",
      },
    ],
  });
  res.status(201).json(pedidos);
}

router.get("/", auth, getPedidos);
router.get("/:id", auth, getPedido);
router.get("/admin", auth, getPedidos);
router.post("/", auth, postPedido);

export default router;
