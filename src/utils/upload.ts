import { Storage } from '@google-cloud/storage'
import sharp from 'sharp';
const fs = require('fs');
const { format } = require('util');
const Multer = require('multer');

const upload = Multer({ dest: 'uploads/' }); // Diretório temporário para armazenar o arquivo antes do upload

// Configurações do Google Cloud Storage
const storage = new Storage({
    keyFilename: process.env.GOOGLE_STORAGE_KEYFILENAME,
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKETNAME || ''; // Nome do seu bucket no Google Cloud Storage

interface retorno {
    url: string
    thumbnail: string
}

export const uploadFileGoogleStorage = (file: any, name: string): Promise<retorno> => {
    return new Promise(async (resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo foi enviado.'));
        }
        // Cria um novo nome para o arquivo no bucket
        const resizedImagePath = `uploads/${name}-thumb.jpg`;
        const { path } = file;
        const isBucketTrue = (await storage.bucket(bucketName).exists())[0]
        if (isBucketTrue) {
            sharp(file.path)
                .resize(500, 500, { fit: 'inside' })
                .toFile(resizedImagePath, async (err, info) => {
                    const teste = storage.bucket(bucketName).upload(resizedImagePath, {
                        destination: `${name}-thumb.jpg`,
                    }).catch(e => {
                        throw e;
                    })
                    const teste2 = storage.bucket(bucketName).upload(path, {
                        destination: `${name}.jpg`,
                    }).catch(e => {
                        throw e;
                    })
                    Promise.all([teste, teste2]).then((item) => {
                        const fileUrl = `https://storage.googleapis.com/${bucketName}/${name}-thumb.jpg`;
                        const fileUrl2 = `https://storage.googleapis.com/${bucketName}/${name}.jpg`;
                        fs.unlinkSync(path);

                        resolve({ url: fileUrl2, thumbnail: fileUrl })

                    })

                })
        }
        else { // <-- note `e` has explicit `unknown` type
            const resizedImagePath = `uploads/thumbnail/${name}-diminuido.jpg`;
            const { path } = file;
            sharp(file.path)
                .resize(500, 500, { fit: 'inside' })
                .toFile(resizedImagePath, async (err, info) => {
    
    
                    const fileUrl = `http://localhost:${process.env.PORT}/uploads/thumbnail/${name}-diminuido.jpg`;
                    const fileUrl2 = `http://localhost:${process.env.PORT}/uploads/${name}.jpg`;
                    console.log("🚀 ~ .toFile ~ file.path:", file.path)
                    fs.rename(file.path, `uploads/${name}.jpg`,
                        (error: any) => {
                            if (error) {
                                // Show the error 
                                console.log(error);
                            }
                            else {
                                // List all the filenames after renaming 
                                console.log("\nFile Renamed\n");
                                // List all the filenames after renaming 
                            }
                        });
    
                    resolve({ url: fileUrl2, thumbnail: fileUrl })
                })
    
        }
    });
};
export const uploadFile = (file: any, name: string): Promise<retorno> => {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo foi enviado.'));
        }
        // Cria um novo nome para o arquivo no bucket
        const resizedImagePath = `uploads/thumbnail/${name}-diminuido.jpg`;
        const { path } = file;
        sharp(file.path)
            .resize(500, 500, { fit: 'inside' })
            .toFile(resizedImagePath, async (err, info) => {


                const fileUrl = `http://localhost:3005/uploads/thumbnail/${name}-diminuido.jpg`;
                const fileUrl2 = `http://localhost:3005/uploads/${name}.jpg`;
                console.log("🚀 ~ .toFile ~ file.path:", file.path)
                fs.rename(file.path, `uploads/${name}.jpg`,
                    (error: any) => {
                        if (error) {
                            // Show the error 
                            console.log(error);
                        }
                        else {
                            // List all the filenames after renaming 
                            console.log("\nFile Renamed\n");
                            // List all the filenames after renaming 
                        }
                    });

                resolve({ url: fileUrl2, thumbnail: fileUrl })
            })

    });
};
