import { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";


const bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME || ""; // Nome do seu bucket no Google Cloud Storage
const cloudStorage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_STORAGE_KEYFILENAME || "") || {},
});


export const generateSigned = async (req: Request, res: Response)  => {
  const fileName = req.params.fileName;
  try {
    const teste= await cloudStorage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
      });
    const [url] = await cloudStorage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // URL válida por 15 minutos
      });
    res.json({ url: url });
  } catch (error: any) {
    throw new Error(`Erro ao gerar a URL assinada: ${error.message}`);
  }
}