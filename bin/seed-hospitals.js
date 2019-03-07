// seed hospitals
const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
const jsonData = require("./DataHospitals.json");
const dotenv = require("dotenv");
dotenv.config();
// Calling files is case sensitive on Heroku
// heroku run bash && cd bin && ls
// https://stackoverflow.com/a/19348043/3468846

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// monkey patch object structure to fit mongodb geojson sort functionality
jsonData.forEach(element => {
  Hospital.create(
    {
      identifier: element.identifier,
      type: element.type,
      managerEntity: element.managerEntity,
      acronym: element.acronym,
      group: element.group,
      name: element.name,
      streetNumber: element.streetNumber,
      streetName: element.streetName,
      roadType: element.roadType,
      zipCode: element.zipCode,
      cedex: element.cedex,
      city: element.city,
      country: element.country,
      phoneNumber: element.phoneNumber,
      latitude: element.latitude,
      longitude: element.longitude,
      location: {
        type: "Point",
        coordinates: [element.latitude, element.longitude]
      },
      urlToPlan: element.urlToPlan
    },
    function(e) {
      if (e) {
        console.log(
          `There is an error somewhere.. Failed to add${
            jsonData.length
          } hospitals`,
          e
        );
        throw e;
      } else {
        console.log(`${element.name} was added to the DB`);
      }
    }
  );
});

// seed object as it
// Hospital.create(jsonData, function(e) {
//   if (e) {
//     console.log(
//       `There is an error somewhere.. Failed to add${jsonData.length} hospitals`,
//       e
//     );
//     throw e;
//   } else {
//     console.log(`${jsonData.length} hospitals were added to the DB`);
//   }
// });
