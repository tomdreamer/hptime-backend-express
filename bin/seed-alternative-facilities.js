// seed hospitals
const mongoose = require("mongoose");
const AlternativeFacility = require("../models/AlternativeFacility");
const jsonData = require("./DataAlternativeFacilities.json");

mongoose
  .connect("mongodb://localhost/hptime-backend", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

AlternativeFacility.create(jsonData, function(e) {
  if (e) {
    console.log(
      `There is an error somewhere.. Failed to add${
        jsonData.length
      } alt facilities`,
      e
    );
    throw e;
  } else {
    console.log(`${jsonData.length} hospitals were added to the DB`);
  }
});
