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

docker_back-build:
	cd back; docker build -t express .

docker_back-create:
	cd back; docker create --name express_app --env-file ./.env -p 5000:5000 -v "$$(pwd)"/src/:/app/src/ express

docker_back-start:
	cd back; docker container start express_app -a

docker_back-sh:
	cd back; docker exec -it express_app sh
