# hptime-backend-express

An Express server to serve details on AP HP hospitals in Ile de France.

## install and setup :

Run \$ npm install

Seed users roles (admin, dispatch, paramadics and users)
\$ node bin/seeds.js

Seed MongoDB with hospitals, corresponding services and alternatives structures :
$ node bin/seed-hospitals.js  
$ node bin/seed-hospitals-services  
\$ node bin/seed-alternative-facilities.js

Fill PORT=5555 (env file) and start the server :
\$ npm run-script dev
