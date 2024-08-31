# Use a imagem oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências da API
RUN npm install

# Copie o restante do código da API
COPY . .

# Exponha a porta que a API usará
EXPOSE 3000

# Comando para iniciar a API
CMD ["node", "index.js"]