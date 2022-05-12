start_b:
	cd back; npm run dev

back_build:
	cd back; npm run build

start_f:
	cd front; npm run dev

front_build:
	cd front; npm run build

init_db:
	cd back; ./node_modules/.bin/knex --knexfile ./knexfile.ts migrate:latest; ./node_modules/.bin/knex --knexfile ./knexfile.ts seed:run;

build:
	cd back; npm run build; cd ../front; npm run build;

start:
	pm2 start all

stop:
	pm2 stop all

db_init_dev:
	cd back; npm run knex:init

# docker back - start

docker_back-build:
	cd back; docker build -t express .

docker_back-create:
	cd back; docker create --name express_app --env-file ./.env -p 5000:5000 -v "$$(pwd)"/src/:/app/src/ express

docker_back-start:
	cd back; docker container start express_app -a

docker_back-run:
	cd back; docker run --rm --name express_app \
	 --env-file ./.env \
	 -p 5000:5000 \
	 -v "$$(pwd)"/src/:/app/src/ \
	 -v geoconect:/app/data/ \
	 express

docker_back-sh:
	cd back; docker exec -it express_app sh

# docker-compose back

docker_front-build:
	cd back; docker build -t nextjs .

docker_front-create:
	cd front; docker create --name nextjs_app --env-file ./.env -p 3500:3500 -v "$$(pwd)"/src/:/app/src/ nextjs

dev_front:
	cd front; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

dev_front-b:
	cd front; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

dev_back:
	cd back;  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

dev_back-b:
	cd back;  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

dev_build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

prod_build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
