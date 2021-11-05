back_dev:
	cd back; npm run dev

front_dev:
	cd front; npm run dev

init_db:
	cd back; ./node_modules/.bin/knex --knexfile ./knexfile.ts migrate:latest; ./node_modules/.bin/knex --knexfile ./knexfile.ts seed:run;
