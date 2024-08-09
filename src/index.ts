import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import "express-async-errors";
import fs from "fs";
import helmet from "helmet";
import * as MercadoPago from "mercadopago";
import morgan from "morgan";
import categoryRouter from "./controllers/categoryController";
import colorRouter from "./controllers/colorController";
import pedidoRouter from "./controllers/pedidoController";
import productRouter from "./controllers/productController";
import sizeRouter from "./controllers/sizeController";
import clientRouter from "./controllers/clientController";
import bannerRouter from "./controllers/bannerController";
import subCategoryRouter from "./controllers/subCategoryController";
import auth from "./middleware/auth";
import { Client } from "./models/client";
import { Payment } from "./models/payment";
import { IWebhook, payment } from "./types/mp_payment";
import { Pedido } from "./models/pedido";
import { Product } from "./models/product";
import { sendEmail } from "./utils/sendEmail";
import { orderPaymentRejected, orderApproved, orderPendingPayment } from "./utils/email";

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
const app = express();

const jwt = require("jsonwebtoken");

app.use(morgan("tiny"));

app.use(cors());

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
app.post("/mercado_pago_webhook",async (req, res) => {
  const event = req.body as IWebhook;
  var mercadopago = require("mercadopago");
  mercadopago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN,
    options: { timeout: 5000, idempotencyKey: Math.floor(Math.random() * 200) },
  });

  MercadoPago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
  });
  switch (event.type) {
    case "payment":
      mercadopago.payment
        .get(event.data?.id)
        .then((response: { body: payment; status: any }) => {
          Payment.findOne({ where: { mp_id: event.data?.id } }).then((payment:any) => {
            payment.update(
              {
                parcelado:
                  (response.body.installments ? response.body.installments : 0) >
                  0
                    ? true
                    : false,
                quantidade_parcelas: response.body.installments || 0,
                pagamento_confirmado: response.body.status === "Aproved",
                status: response.body.status,
                status_detail: response.body.status_detail,
                id_pagamento_tipo: 1,
                data_pagamento_confirmado: response.body.date_approved,
                mp_id: response.body.id,
                pix_qrcode:
                  response.body.point_of_interaction?.transaction_data
                    ?.qr_code_base64 || "",
              },
              
            )
              .then((updatedPayment: any) => {
                Pedido.update(
                  {
                    pedido_concluido: response.body.status === "Aproved",
                  },
                  { where: { idPagamento: updatedPayment.id } }
                )
                  .then((newOrder: any) => {
                    switch (response.body.status) {
                      case 'rejected':
                        sendEmail({to:'gneri94@gmail.com',
                          subject:`Pedido rejected${response.body.status}`,
                          html:orderPaymentRejected({
                            orderNumber: response.body.id?.toString()||'',
                            orderDate: response.body.id?.toString()||'',
                            customerName: "",
                            supportEmail: "gneri94@gmail.com",
                            supportPhone: "+55 (19) 98262-8074",
                            pay:response.body
                          })
                        })
                        break;
                      case 'approved':
                        sendEmail({to:'gneri94@gmail.com',
                          subject:`Pedido approved ${response.body.status}`,
                          html:orderApproved({
                            orderNumber: response.body.id?.toString()||'',
                            orderDate: response.body.date_approved?.toString()||'',
                            customerName: "",
                            pay:response.body
                          })
                        })
                        break;
                      default:
                        sendEmail({to:'gneri94@gmail.com',
                          subject:`Pedido default${response.body.status}`,
                          html:orderPendingPayment({
                            orderNumber: response.body.id?.toString()||'',
                            orderDate: response.body.date_created?.toString()||'',
                            paymentLink: "",
                            pay:response.body
                          })
                        })
                        break;
                    }
                    res.status(response.status).json(newOrder);
                  })
                  .catch((error: any) => {
                    return res.status(400).json({ status: 400, message: error });
                  });
              })
              .catch((error: any) => {
                return res.status(400).json({ status: 400, message: error });
              });
          }).catch((error: any) => {
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
        { user_id: user.id, email ,name:user.name},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
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

/* app.post("/mercado_pago_issuers", async (req, res) => {
    var mercadopago = require('mercadopago');
    mercadopago.configure({
        access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN
    });

    mercadopago.
}); */
app.post("/mercado_pago", async (req, res) => {
  var mercadopago = require("mercadopago");
  mercadopago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN,
  });

  mercadopago.preferences
    .create(req.body)
    .then(function (preferencia: any) {
      res.status(201).json(preferencia.body);
    })
    .catch(function (error: any) {
      return res.status(400).json({ status: 400, message: JSON.stringify(error) });
    });
});

app.post("/card_token", async (req, res) => {
  MercadoPago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
  });

  const teste = req.body;
  MercadoPago.card_token
    .create({
      card_number: teste.card_number,
      security_code: teste.security_code,
      expiration_month: teste.card_expiration_month,
      expiration_year: teste.cardExpirationYear,
      cardholder: {
        name: teste.card_holder_name,
        identification: {
          number: teste.identification_number,
          type: teste.identification_type,
        },
      },
    })
    .then(function (response: any) {
      res.status(response.status).json(response.body);
    })
    .catch(function (error: any) {
      return res.status(400).json({ status: 400, message: error });
    });
});
app.post("/webhook", async (req, res) => {
  const teste: IWebhook = req.body;
  MercadoPago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
  });
  if (teste.type && teste?.data?.id) {
    MercadoPago.payment.get(teste.data.id || 0).then((x) => {});
  }
});
app.post("/process_payment/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  var mercadopago = require("mercadopago");
  mercadopago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN,
    options: { timeout: 5000, idempotencyKey: Math.floor(Math.random() * 200) },
  });

  MercadoPago.configure({
    access_token: process.env.REACT_APP_MERCADOLIVRE_TOKEN || "",
  });
  mercadopago.payment
    .save(req.body)
    .then(function (response: { body: payment; status: any }) {
      Payment.create({
        parcelado:
          (response.body.installments ? response.body.installments : 0) > 0
            ? true
            : false,
        quantidade_parcelas: response.body.installments || 0,
        pagamento_confirmado: response.body.status === "Aproved",
        status: response.body.status,
        status_detail: response.body.status_detail,
        id_pagamento_tipo: 1,

        data_pagamento_confirmado: response.body.date_approved,
        mp_id: response.body.id,
        pix_qrcode:
          response.body.point_of_interaction?.transaction_data
            ?.qr_code_base64 || "",
      }).then((newPayment: any) => {
        Pedido.update(
          {
            idPagamento: newPayment.id,
          },
          { where: { id: orderId } }
        )
          .then((_newPayment: any) => {
            res.status(response.status).json({...newPayment,..._newPayment});
          })
          .catch((error: any) => {
            return res.status(400).json({ status: 400, message: error });
          });
      });
    })
    .catch(function (error: any) {
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
