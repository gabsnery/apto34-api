import { Storage } from '@google-cloud/storage'
import sharp from 'sharp';
const fs = require('fs');
const { format } = require('util');
const Multer = require('multer');

const upload = Multer({ dest: 'uploads/' }); // Diretório temporário para armazenar o arquivo antes do upload

// Configurações do Google Cloud Storage
const storage = new Storage({
    keyFilename: `src/dora-da603-55fdbf2e26d4.json`,
});

const bucketName = 'apto34'; // Nome do seu bucket no Google Cloud Storage

interface retorno {
    url: string
    thumbnail: string
}

export const uploadFileGoogleStorage = (file: any, name: string): Promise<retorno> => {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo foi enviado.'));
        }
        // Cria um novo nome para o arquivo no bucket
        const resizedImagePath = `uploads/${name}-diminuido.jpg`;
        const { path } = file;
        console.log("🚀 ~ file: upload.ts:27 ~ returnnewPromise ~ path:", path)
        console.log("🚀 ~ file: upload.ts:21 ~ uploadFile ~ path:", path)
        sharp(file.path)
            .resize(500, 500, { fit: 'inside' })
            .toFile(resizedImagePath, async (err, info) => {
                console.log("🚀 ~ file: upload.ts:32 ~ .toFile ~ resizedImagePath:", resizedImagePath)

                const teste = storage.bucket(bucketName).upload(resizedImagePath, {
                    destination: `${name}-diminuido.jpg`,
                }).catch(e => console.log(`ERRAO AQUI ${e}`))
                const teste2 = storage.bucket(bucketName).upload(path, {
                    destination: `${name}.jpg`,
                }).catch(e => console.log(`ERRAO AQUI ${e}`))
                Promise.all([teste, teste2]).then((item) => {
                    console.log("🚀 ~ file: upload.ts:43 ~ Promise.all ~ item:", item)
                    const fileUrl = `https://storage.googleapis.com/${bucketName}/${name}-diminuido.jpg`;
                    const fileUrl2 = `https://storage.googleapis.com/${bucketName}/${name}.jpg`;
                    fs.unlinkSync(path);
                    fs.unlinkSync(resizedImagePath);

                    resolve({ url: fileUrl2, thumbnail: fileUrl })

                })
            })

    });
};
export const uploadFile = (file: any, name: string): Promise<retorno> => {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo foi enviado.'));
        }
        // Cria um novo nome para o arquivo no bucket
        const resizedImagePath = `uploads/${name}-diminuido.jpg`;
        const { path } = file;
        console.log("🚀 ~ file: upload.ts:27 ~ returnnewPromise ~ path:", path)
        console.log("🚀 ~ file: upload.ts:21 ~ uploadFile ~ path:", path)
        sharp(file.path)
            .resize(500, 500, { fit: 'inside' })
            .toFile(resizedImagePath, async (err, info) => {
                console.log("🚀 ~ file: upload.ts:32 ~ .toFile ~ resizedImagePath:", resizedImagePath)
                const fileUrl = `http://localhost:3005/uploads/${name}-diminuido.jpg`;
                const fileUrl2 = `http://localhost:3005/uploads/${name}.jpg`;
                fs.rename(file.path, `uploads/${name}.jpg`, async (err: any, info: any) => {
                    console.log("🚀 ~ file: upload.ts:76 ~ fs.rename ~ err:", err)
                    console.log("🚀 ~ file: upload.ts:76 ~ fs.rename ~ info:", info)
                })

                resolve({ url: fileUrl2, thumbnail: fileUrl })
            })

    });
};
