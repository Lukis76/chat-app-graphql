FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# RUN npm run build

# EXPOSE 5173
EXPOSE 8080

CMD [ "npm", "run", "dev" ]
