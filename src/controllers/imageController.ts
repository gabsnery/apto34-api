import { Storage } from '@google-cloud/storage';

import express, { NextFunction, Request, Response } from 'express';
const database = require('../config/database');
const fs = require('fs');

const router = express.Router();



import path from 'path';

// Configurações do Google Cloud Storage
const storage = new Storage({
    keyFilename: process.env.GOOGLE_STORAGE_KEYFILENAME,
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME || ''; // Nome do seu bucket no Google Cloud Storage


const getLocalImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    console.log('entrou aqui')

    try {
        const [url] = await storage.bucket(bucketName).file('1831689900393785-diminuido.jpg').getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
        });
        res.json({ url: url });
      } catch (error:any) {
        throw new Error(`Erro ao gerar a URL assinada: ${error.message}`);
      }
/* 
  const fullPath = path.join(__dirname, '../rebelmoon.jpg');
  const [url] = await storage.bucket(bucketName).file(filename).getSignedUrl(options);

  // Verifica se a imagem existe
  fs.stat(fullPath, (err:any, stats:any) => {
    if (err || !stats.isFile()) {
      res.status(404).send('Imagem não encontrada');
      return;
    }

    // Define o tipo de conteúdo como imagem e envia o arquivo
    res.sendFile(fullPath);
  }); */
};


router.get('/', getLocalImage);

export default router;
