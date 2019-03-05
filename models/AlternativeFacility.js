const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// services are an embedded doc objects, each Hospital 0:n services
const AlternativeFacilitySchema = new Schema(
  {
    shortname: String,
    type: String,
    managerEntity: String,
    acronym: String,
    name: String,
    streetNumber: String,
    streetName: String,
    roadType: String,
    streetName: String,
    zipCode: String,
    city: String,
    country: String,
    phoneNumber: String,
    secondPhoneNumber: String,
    patientType: String,
    pathology: String,
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
    publicHoliday: String,
    latitude: Number,
    longitude: Number,
    location: {
      type: { type: String },
      coordinates: [Number]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
AlternativeFacilitySchema.index({ location: "2dsphere" });
const AlternativeFacility = mongoose.model(
  "AlternativeFacility",
  AlternativeFacilitySchema
);
module.exports = AlternativeFacility;
