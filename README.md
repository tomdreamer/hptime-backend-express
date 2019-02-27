# hptime-backend-express

An Express server to serve details on AP HP hospitals in Ile de France.

Seed MongoDB with hospitals, corresponding services and alternatives structures :
node bin/seed-hospitals.js  
node bin/seed-hospitals-services  
node bin/seed-alternative-facilities.js

then start the server on PORT=5555 (env file)
npm run-start-dev
