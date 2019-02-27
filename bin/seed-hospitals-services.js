// connect with mangoose and seed services into hospitals
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Hospital = require("../models/hospital");
const jsonData = require("./dataHospitalServices.json");

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

// find each hospital by identifier and push services into the corresponding one
let newArr = jsonData.map((serviceObj, index, arr) => {
  // Hospital.find({ identifier: item.identifier }, function(err, docs) {
  //   docs.availablePoles.push({ item });
  //   console.log(item.pathology, "was inserted into hospital named:", docs.name);
  // });
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
