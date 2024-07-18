import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import express from "express";
import auth from "../middleware/auth";
import { Size } from "../models/size";
import PedidoRequest from "../types/pedido";
import { Pedido } from "../models/pedido";
import { Address } from "../models/adress";
import { Deliver } from "../models/deliver";
const database = require("../config/database");

const router = express.Router();

async function postPedido(req: Request, res: Response, next: NextFunction) {
  const body = req.body as PedidoRequest;

  console.log("🚀 ~ body:", body)
  await Address.create({
    cep: body.endereco.cep,
    logradouro: body.endereco.logradouro,
    numero: body.endereco.numero,
    complemento: body.endereco.complemento,
    bairro: body.endereco.bairro,
    id_cidade: 1,
  }).then(async (newAddress: typeof Address) => {
    console.log("🚀 ~ newAddress:", newAddress);
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
      .then((newDeliver: typeof Deliver) => {
        console.log("🚀 ~ newDeliver:", newDeliver);
        console.log("🚀 ~ newDeliver:", {
          idPedidoStatus: 1,
          data_pedido_realizado: Date.now(),
          idCliente: body.clienteId,
          idEntrega: newDeliver.id,
          pedido_concluido: false,
        });
        Pedido.create({
          idPedidoStatus: 1,
          data_pedido_realizado: Date.now(),
          idCliente: body.clienteId,
          idEntrega: newDeliver.id,
          pedido_concluido: false,
        })
          .then((newOrder: typeof Pedido) => {
            console.log("🚀 ~ .then ~ newOrder:", newOrder);
            res.status(201).json(newOrder);
          })
          .catch((e: any) => {
            console.log("🚀 ~ .then ~ e:", e)
            res.status(400);
          });
      })
      .catch((e: any) => res.status(400));
  });
}

async function getPedidos(req: Request, res: Response, next: NextFunction) {
  const pedidos = await Pedido.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
  res.json(pedidos);
}

router.get("/", auth, getPedidos);
router.post("/", postPedido);

export default router;
