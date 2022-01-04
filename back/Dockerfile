FROM node:14.17-alpine
WORKDIR /app/
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install
EXPOSE 4000
CMD npm run dev
