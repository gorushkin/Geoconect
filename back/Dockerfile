FROM node:14.17-alpine
WORKDIR /app/
RUN mkdir db

COPY package.json ./
COPY src/ ./src
COPY tsconfig.json ./
COPY tsconfig.production.json ./

RUN npm install
RUN npm install knex -g
ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

EXPOSE 4000
CMD npm run dev
