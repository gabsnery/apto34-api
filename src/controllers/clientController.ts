import { Storage } from "@google-cloud/storage";
import bcrypt from "bcryptjs";
import express, { NextFunction, Request, Response } from "express";
import { Client } from "../models/client";
import auth from "../middleware/auth";
const database = require("../config/database");
const Multer = require("multer");
const jwt = require("jsonwebtoken");

const router = express.Router();

async function postClient(req: Request, res: Response, next: NextFunction) {
  const { name, email, cpf,surname, password } = req.body;
  let encryptedPassword = await bcrypt.hash(password, 10);
  Client.create({
    nome: name,
    sobrenome: surname,
    email: email,
    cpf: cpf,
    senha: encryptedPassword,
  })
    .then((newClient: typeof Client) => {
      res.status(201).json(newClient);
    })
    .catch((error: any) => {
      res.status(400).json(error);
    });
}
async function getClient(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error();
  }

  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  (req as any).token = decoded;
  const clientId = decoded.user_id;

  Client.findOne({ where: { id: clientId } })
    .then((client: typeof Client) => {
      res.status(201).json(client);
    })
    .catch((error: any) => {
      res.status(400).json(error);
    });
}

router.post("/", postClient);
router.get("/",auth, getClient);

export default router;
