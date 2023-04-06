FROM node:18-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

# CMD ["npm", "run", "dev"]

# EXPOSE 3000

# ------------------------------------------------------------------------------------

FROM node:18-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# ENTRYPOINT ["node", ".output/server/index.mjs"]