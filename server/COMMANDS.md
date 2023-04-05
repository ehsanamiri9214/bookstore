- Drop schema:
npx typeorm drop:schema -d ./dist/config/orm.config.js
or
npm run db:schema:drop

---------------------------------------------------------------------

- Sync schema:
npx typeorm drop:sync -d ./dist/config/orm.config.js
or
npm run db:schema:sync

---------------------------------------------------------------------

- Generate new migration:
npx typeorm migration:generate ./src/db/migrations/filename -d ./dist/config/orm.config.js
or
npm run db:migration:generate --name=filename

---------------------------------------------------------------------

- Create new migration:
npx typeorm migration:create ./src/db/migrations/filename
or
npm run db:migration:create --name=filename

---------------------------------------------------------------------

- Run migration:
npx typeorm migration:run -d ./dist/config/orm.config.js
or
npm run db:migration:run

---------------------------------------------------------------------

- Revert migration:
npx typeorm migration:revert -d ./dist/config/orm.config.js
or
npm run db:migration:revert

---------------------------------------------------------------------

- Backup DB:
docker exec db /usr/bin/mysqldump -u root --password=root bookstore > bookstore_db_backup_0.1.sql

---------------------------------------------------------------------

- Restore DB backup:
cat bookstore_db_backup_0.1.sql | docker exec -i db /usr/bin/mysql -u root --password=root bookstore