FROM node:14.17-alpine
WORKDIR /app/

COPY package.json ./
COPY src/ ./src
COPY tsconfig.json ./

RUN npm install
ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

EXPOSE 4000
CMD npm run dev
