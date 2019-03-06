// connect with mangoose and seed services into hospitals

const mongoose = require("mongoose");
const Hospital = require("../models/hospital");
const jsonData = require("./dataHospitalServices.json");

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

// find each hospital by identifier and push services into the corresponding one
let newArr = jsonData.map((serviceObj, index, arr) => {
  Hospital.findOneAndUpdate(
    { identifier: serviceObj.identifier },
    { $push: { availablePoles: serviceObj } },
    function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
});
