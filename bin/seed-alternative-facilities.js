// seed alt facilities (clinics, doctor with unscheduled appointments and small care houses)
const mongoose = require("mongoose");
const AlternativeFacility = require("../models/AlternativeFacility");
const jsonData = require("./DataAlternativeFacilities.json");

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

jsonData.forEach(element => {
  AlternativeFacility.create(
    {
      shortname: element.shortname,
      type: element.type,
      managerEntity: element.managerEntity,
      acronym: element.acronym,
      name: element.name,
      streetNumber: element.streetNumber,
      streetName: element.streetName,
      roadType: element.roadType,
      zipCode: element.zipCode,
      city: element.city,
      country: element.country,
      phoneNumber: element.phoneNumber,
      secondPhoneNumber: element.secondPhoneNumber,
      patientType: element.patientType,
      pathology: element.pathology,
      monday: element.monday,
      tuesday: element.tuesday,
      wednesday: element.wednesday,
      thursday: element.thursday,
      friday: element.friday,
      saturday: element.saturday,
      sunday: element.sunday,
      publicHoliday: element.publicHoliday,
      latitude: element.latitude,
      longitude: element.longitude,
      location: {
        type: "Point",
        coordinates: [element.latitude, element.longitude]
      }
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
        console.log(`${element.shortname} was added to the DB`);
      }
    }
  );
});
// AlternativeFacility.create(jsonData, function(e) {
//   if (e) {
//     console.log(
//       `There is an error somewhere.. Failed to add${
//         jsonData.length
//       } alt facilities`,
//       e
//     );
//     throw e;
//   } else {
//     console.log(`${jsonData.length} hospitals were added to the DB`);
//   }
// });
