FROM node:14.17-alpine
WORKDIR /app/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
EXPOSE 4000
CMD npm run dev
