FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .
# RUN npx prisma migrate dev --schema=src/prisma/schema.prisma
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build


# EXPOSE 3005
EXPOSE 443

CMD [ "npm", "run", "start" ]
