# Use uma imagem base oficial do Node.js, uma versão mais recente de LTS
FROM node:18-alpine AS base

# Defina o diretório de trabalho dentro do container
WORKDIR /app
RUN ls
# Copie apenas os arquivos package.json e package-lock.json
COPY package*.json ./
RUN ls
# Instale apenas as dependências de produção
RUN npm i

# Copie o restante do código da aplicação
COPY . .

RUN npm run build
RUN ls
# Exponha a porta que a API vai escutar
EXPOSE 3000

# Use o comando CMD para iniciar a aplicação
CMD ["node", "dist/index.js"]
