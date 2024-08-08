import { Storage } from "@google-cloud/storage";
import bcrypt from "bcryptjs";
import express, { NextFunction, Request, Response } from "express";
import { Client } from "../models/client";
const database = require("../config/database");
const Multer = require("multer");

const router = express.Router();

async function postClient(req: Request, res: Response, next: NextFunction) {
  const { name, email, surname, password } = req.body;
  let encryptedPassword = await bcrypt.hash(password, 10);
  Client.create({
    nome: name,
    sobrenome: surname,
    email: email,
    senha: encryptedPassword,
  })
    .then((newClient: typeof Client) => {
      res.status(201).json(newClient);
    })
    .catch((error: any) => {
      res.status(400).json(error);
    });
}

router.post("/", postClient);

export default router;
