# Use uma imagem base adequada
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependência do projeto para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Exponha a porta que a aplicação estará escutando
EXPOSE 3005

# Comando para iniciar a aplicação dentro do contêiner
CMD ["npm", "start"]
