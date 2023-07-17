import {Storage} from '@google-cloud/storage'
const fs = require('fs');
const { format } = require('util');
const Multer = require('multer');

const upload = Multer({ dest: 'uploads/' }); // Diretório temporário para armazenar o arquivo antes do upload

// Configurações do Google Cloud Storage
const storage = new Storage({
    keyFilename: `src/dora-da603-55fdbf2e26d4.json`,
});

const bucketName = 'apto34'; // Nome do seu bucket no Google Cloud Storage


export const uploadFile = (file: any, name: string): Promise<string> => {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo foi enviado.'));
        }

        // Cria um novo nome para o arquivo no bucket
        const fileName = `${name}.png`;

        // Define as opções do upload
        const options = {
            destination: fileName,
        };

        // Realiza o upload do arquivo para o Google Cloud Storage
        storage.bucket(bucketName).upload(file.path, options, (err, uploadedFile) => {
            if (err) {
                console.error('Erro ao fazer upload do arquivo:', err);
                reject(new Error('Ocorreu um erro ao fazer upload do arquivo.'));
            }

            // Remove o arquivo temporário
            fs.unlinkSync(file.path);

            // Retorna a URL de acesso ao arquivo no Google Cloud Storage
            const fileUrl = `https://storage.googleapis.com/${bucketName}/${uploadedFile.name}`;
            resolve(fileUrl);
        });
    });
};
