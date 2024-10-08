require('newrelic');
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import {
  MercadoPagoConfig,
  Payment as MPPayment,
  Preference
} from "mercadopago";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import morgan from "morgan";
import bannerRouter from "./controllers/bannerController";
import categoryRouter from "./controllers/categoryController";
import clientRouter from "./controllers/clientController";
import colorRouter from "./controllers/colorController";
import pedidoRouter from "./controllers/pedidoController";
import productRouter from "./controllers/productController";
import sizeRouter from "./controllers/sizeController";
import subCategoryRouter from "./controllers/subCategoryController";
import auth from "./middleware/auth";
import { Client } from "./models/client";
import { Payment } from "./models/payment";
import { Pedido } from "./models/pedido";
import { IWebhook } from "./types/mp_payment";
import { changeStatus } from "./utils/changeOrderStatus";
import {
  orderApproved,
  orderPaymentRejected,
  orderPendingPayment,
} from "./utils/email";
import { sendEmail } from "./utils/sendEmail";
import { generateSigned } from "./utils/generateSigned";
(async () => {
  const database = require("./config/database");
  database.sequelize
    .sync()
    .then((e: any) => {})
    .catch((e: any) => {
      console.log("erro", e);
    });
})();
const http = require("http");
const PORT = process.env.PORT || 3000;
const CORS_URL = process.env.FRONT_APP_URL || 'http://localhost:5173';
const app = express();

const jwt = require("jsonwebtoken");

app.use(morgan("tiny"));

var whitelist = [CORS_URL]
var corsOptionsDelegate = function (req:any, callback:any) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
var corsOptions = {
    origin: CORS_URL,
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST" // add per need
}
app.use(cors(corsOptionsDelegate));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.get("/", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.get("/send_Email", async (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.post("/mercado_pago_webhook", async (req, res) => {
  const event = req.body as IWebhook;
  console.log("🚀mercado_pago_webhook~ req.body:", req.body);
  console.log("🚀mercado_pago_webhook", req.body);
  const mp_client = new MercadoPagoConfig({
    accessToken: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
    options: {
      timeout: 5000,
      idempotencyKey: Math.floor(Math.random() * 200).toString(),
    },
  });
  const payment = new MPPayment(mp_client);

  console.log("🚀 ~ app.post ~ event.data?.id:", event.data?.id);
  if (event.data?.id) {

    switch (event.type) {
      case "payment":
        payment
          .get({ id: event.data?.id?.toString() })
          .then((response: PaymentResponse) => {
            console.log("🚀 ~ .then ~ response:", response);
            Payment.findOne({ where: { mp_id: event.data?.id } })
              .then((_payment: any) => {
                _payment
                  .update({
                    parcelado:
                      (response.installments ? response.installments : 0) > 0
                        ? true
                        : false,
                    quantidade_parcelas: response.installments || 0,
                    pagamento_confirmado: response.status === "Aproved",
                    status: response.status,
                    status_detail: response.status_detail,
                    id_pagamento_tipo: 1,
                    data_pagamento_confirmado: response.date_approved,
                    mp_id: response.id,
                    pix_qrcode:
                      response.point_of_interaction?.transaction_data
                        ?.qr_code_base64 || "",
                  })
                  .then(async (updatedPayment: any) => {
                    const pedido = await Pedido.findOne({
                      where: { idPagamento: updatedPayment.id },
                    });
                    changeStatus({
                      idPedido: pedido.id,
                      status:
                        response.status === "rejected"
                          ? "Pagamento Rejeitado"
                          : response.status === "approved"
                          ? "Pagamento Aprovado"
                          : "Pagamento Pendente",
                    })
                      .then((newOrder: any) => {
                        switch (response.status) {
                          case "rejected":
                            sendEmail({
                              to: "gneri94@gmail.com",
                              subject: `Pedido rejected${response.status}`,
                              html: orderPaymentRejected({
                                orderNumber: response.id?.toString() || "",
                                orderDate: response.id?.toString() || "",
                                customerName: "",
                                supportEmail: "gneri94@gmail.com",
                                supportPhone: "+55 (19) 98262-8074",
                                pay: response,
                              }),
                            });
                            break;
                          case "approved":
                            sendEmail({
                              to: "gneri94@gmail.com",
                              subject: `Pedido approved ${response.status}`,
                              html: orderApproved({
                                orderNumber: response.id?.toString() || "",
                                orderDate:
                                  response.date_approved?.toString() || "",
                                customerName: "",
                                pay: response,
                              }),
                            });
                            break;
                          default:
                            sendEmail({
                              to: "gneri94@gmail.com",
                              subject: `Pedido default${response.status}`,
                              html: orderPendingPayment({
                                orderNumber: response.id?.toString() || "",
                                orderDate:
                                  response.date_created?.toString() || "",
                                paymentLink: "",
                                pay: response,
                              }),
                            });
                            break;
                        }
                        res.status(200).json(newOrder);
                      })
                      .catch((error: any) => {
                        return res
                          .status(400)
                          .json({ status: 400, message: error });
                      });
                  })
                  .catch((error: any) => {
                    return res
                      .status(400)
                      .json({ status: 400, message: error });
                  });
              })
              .catch((error: any) => {
                return res.status(400).json({ status: 400, message: error });
              });
          })
          .catch(function (error: any) {
            return res.status(400).json(error);
          });
        break;
      default:
        return res.status(400).json({});
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!(email && senha)) {
      res.status(400).send("All input is required");
    }
    const user = await Client.findOne({ where: { email: email } });
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const token = jwt.sign(
        { user_id: user.id, email, name: user.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    return res.status(400).json({ status: 400, message: err });
  }
});
app.post("/register", async (req, res) => {
  const { first_name, email, last_name, password } = req.body;
  let encryptedPassword = await bcrypt.hash(password, 10);
  const teste = await Client.create({
    nome: first_name,
    sobrenome: last_name,
    email: email,
    senha: encryptedPassword,
  });
  res.status(201).json(teste);
});

app.post("/mercado_pago/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const mp_client = new MercadoPagoConfig({
    accessToken: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
    options: {
      timeout: 5000,
      idempotencyKey: Math.floor(Math.random() * 200).toString(),
    },
  });
  const _body = req.body as {
    payer: {
      email: string;
      first_name: string;
      last_name: string;
      identification: { type: string; number: "string" };
    };
    card_token: string;
    transaction_amount: number;
  };
  const preferences = new Preference(mp_client);
  preferences
    .create({ body: req.body })
    .then(function (preferencia: any) {
      changeStatus({ status: "Pagamento Pendente", idPedido: orderId });
      res.status(201).json(preferencia.body);
    })
    .catch(function (error: any) {
      return res
        .status(400)
        .json({ status: 400, message: JSON.stringify(error) });
    });
});

app.post("/process_payment/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  const mp_client = new MercadoPagoConfig({
    accessToken: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
    options: {
      timeout: 5000,
      idempotencyKey: Math.floor(Math.random() * 200).toString(),
    },
  });
  const payment = new MPPayment(mp_client);
  const { card_token, ...body } = req.body;
  payment
    .create({ body: { ...body, token: card_token || undefined } })
    .then((response: PaymentResponse) => {
      Payment.create({
        parcelado:
          (response.installments ? response.installments : 0) > 0
            ? true
            : false,
        quantidade_parcelas: response.installments || 0,
        pagamento_confirmado: response.status === "Aproved",
        status: response.status,
        status_detail: response.status_detail,
        id_pagamento_tipo: 1,

        data_pagamento_confirmado: response.date_approved,
        mp_id: response.id,
        pix_qrcode:
          response.point_of_interaction?.transaction_data?.qr_code_base64 || "",
      })
        .then((newPayment: any) => {
          Pedido.update(
            {
              idPagamento: newPayment.id,
            },
            { where: { id: orderId } }
          )
            .then((_newPayment: any) => {
              res.status(200).json(response);
            })
            .catch((error: any) => {
              console.log("🚀 ~ error 2:", error);
              return res.status(400).json({ status: 400, message: error });
            });
        })
        .catch((error: any) => {
          console.log("🚀 ~ error 2:", error);
          return res.status(400).json({ status: 400, message: error });
        });
    })
    .catch(function (error: any) {
      console.log("🚀 ~ app.post ~ error:1", error);
      return res.status(400).json({ status: 400, message: error });
    });
});

app.use("/api/product/", productRouter);
app.use("/api/color/", colorRouter);
app.use("/api/sizes/", sizeRouter);
app.use("/api/Subcategorias/", subCategoryRouter);
app.use("/api/category/", categoryRouter);
app.use("/api/order/", pedidoRouter);
app.use("/api/client/", clientRouter);
app.use("/api/banner/", bannerRouter);
app.use("/uploads", express.static("uploads"));

app.get("/api/generate_signed/:fileName",generateSigned)

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
