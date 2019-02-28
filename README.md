# hptime-backend-express

An Express server to serve details on AP HP hospitals in Ile de France.

## install and setup :

Run \$ npm install

Seed users roles (admin, dispatch, paramadics and users)
\$ node bin/seeds.js

Seed MongoDB with users, hospitals, corresponding services and alternatives structures :
$ node bin/seeds.js
$ node bin/seed-hospitals.js  
$ node bin/seed-hospitals-services  
$ node bin/seed-alternative-facilities.js

Fill PORT=5555 (env file) and start the server :
\$ npm run-script dev

## Api endpoints

### GET requests

Hospitals
http://localhost:2999/api/hospitals gives a list of 5 hospitals sorted by name (index)
http://localhost:2999/api/hospitals?size=20?offset=20 (show the 20-40 hospitals)
http://localhost:2999/api/hospitals/page/
http://localhost:2999/api/hospitals/:hospitalIdentifier gives you one result (show)
TODO (add)
TODO (edit)

Alternative structures
http://localhost:2999/api/alternatives-structures/?size=20?offset=20
http://localhost:2999/api/alternatives-structures/:id

### POST requests

TODO (new)
TODO (delete)
