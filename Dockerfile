# Use uma imagem base oficial do Node.js, uma versão mais recente de LTS
FROM node:18-alpine AS base

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale apenas as dependências de produção

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a API vai escutar
EXPOSE 3000

# Use o comando CMD para iniciar a aplicação
CMD ["node", "dist/index.js"]
