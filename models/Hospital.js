const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// services are an embedded doc objects, each Hospital 0:n services
const hospitalSchema = new Schema(
  {
    identifier: String,
    type: String,
    managerEntity: String,
    acronym: String,
    group: String,
    name: String,
    streetNumber: String,
    streetName: String,
    roadType: String,
    zipCode: String,
    cedex: String,
    city: String,
    country: String,
    phoneNumber: String,
    latitude: Number,
    longitude: Number,
    urlToPlan: { type: String, match: /^https?:\/\// },
    availablePoles: []
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
