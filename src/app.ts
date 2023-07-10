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
        const user = await Client.findOne({where:{ email:email }});
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
    const { first_name,email, last_name,password } = req.body;
    console.log("🚀 ~ file: app.ts:53 ~ app.post ~ password:", password)
    console.log("🚀 ~ file: app.ts:53 ~ app.post ~ last_name:", last_name)
    console.log("🚀 ~ file: app.ts:53 ~ app.post ~ email:", email)
    console.log("🚀 ~ file: app.ts:53 ~ app.post ~ first_name:", first_name)
    let encryptedPassword = await bcrypt.hash(password, 10);
    const teste=await Client.create({
        nome: first_name,
        sobrenome: last_name,
        email: email,
        senha:encryptedPassword
    })
    res.status(201).json(teste);
});

app.use('/products/', productRouter);
app.use('/color/', colorRouter);
app.use('/sizes/', sizeRouter);
export default app;