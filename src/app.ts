import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import auth from './middleware/auth';
import { User } from './models/user';
import customerRouter from './routes.config';
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
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({where:{ email:email }});
        if (user && (await bcrypt.compare(password, user.password))) {
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
    let encryptedPassword = await bcrypt.hash(password, 10);
    const teste=await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password:encryptedPassword
    })
    res.status(201).json(teste);
});

app.use('/customers/', customerRouter);
export default app;