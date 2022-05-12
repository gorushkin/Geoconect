FROM node:14.17-alpine
WORKDIR /app/

COPY package.json ./
RUN npm install
RUN npm install knex -g
COPY tsconfig.json ./
COPY tsconfig.production.json ./
# COPY src/ ./src

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

EXPOSE 4000
CMD npm run dev
