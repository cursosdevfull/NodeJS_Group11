FROM node:alpine3.16 as builder

RUN apk add curl bash --no-cache

RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

WORKDIR /build

COPY package.json .

RUN npm install --production

COPY . .

RUN npm run build

RUN npm prune

RUN /usr/local/bin/node-prune

# Carpeta de producción
FROM node:alpine3.16 

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist ./dist

COPY --from=builder /build/package.json .

COPY --from=builder /build/.env ./.env

CMD ["npm", "run", "start"]