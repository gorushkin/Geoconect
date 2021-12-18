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
