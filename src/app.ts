import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import auth from './middleware/auth';
import { Client } from './models/client';
import productRouter from './controllers/productController';
import colorRouter from './controllers/colorController';
import sizeRouter from './controllers/sizeController';
import subCategoryRouter from './controllers/subCategoryController';
const pagarme = require('pagarme')
const jwt = require("jsonwebtoken");

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
// Login
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!(email && senha)) {
            res.status(400).send("All input is required");
        }
        const user = await Client.findOne({ where: { email: email } });
        if (user && (await bcrypt.compare(senha, user.senha))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});
app.post("/register", async (req, res) => {
    const { first_name, email, last_name, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    const teste = await Client.create({
        nome: first_name,
        sobrenome: last_name,
        email: email,
        senha: encryptedPassword
    })
    res.status(201).json(teste);
});

app.post("/pagar_me", async (req, res) => {
    var fs = require('fs');
    const request = require("request");
    var body = JSON.parse(fs.readFileSync('body.json', 'utf8'));
    
    var options = {                 
        method: 'POST',             
        uri: 'https://api.pagar.me/core/v5/orders',                    
        headers: {               
          'Authorization': 'Basic ' + Buffer.from("sk_test_*:").toString('base64'),
          'Content-Type': 'application/json'              
        },
        json : body
    };    
    
    request(options, function(error:any, response:any, body:any) {  
        console.log(response.body);
    });
})
app.post("/mercado_pago", async (req, res) => {
    var mercadopago = require('mercadopago');
    mercadopago.configure({
        access_token: 'TEST-470723307119049-081900-46bbea6c2dff856c33c1831c8fc99548-209131572'
    });
 
    mercadopago.preferences.create(req.body)
    .then(function (preferencia: any) {
        const {  id } = preferencia.body;

            console.log("🚀 ~ file: app.ts:134 ~ .then ~ preferencia:", preferencia)
            // Este valor substituirá a string "<%= global.id %>" no seu HTML
            res.status(201).json(id);

        }).catch(function (error: any) {
            console.log(error);
        });

});
app.post("/process_payment", async (req, res) => {


    var mercadopago = require('mercadopago');
    mercadopago.configure({
        access_token: 'TEST-470723307119049-081900-46bbea6c2dff856c33c1831c8fc99548-209131572'
    });
 
    console.log("🚀 ~ file: app.ts:136 ~ response.body:", req.body)
    mercadopago.payment.save(req.body)
        .then(function (response: any) {
            const { status, status_detail, id } = response.body;
            res.status(response.status).json(response.body.id);
        })
        .catch(function (error: any) {
            console.error(error);
            res.status(400)
        });
});

app.use('/api/product/', productRouter);
app.use('/api/color/', colorRouter);
app.use('/api/sizes/', sizeRouter);
app.use('/api/Subcategorias/', subCategoryRouter);
export default app;