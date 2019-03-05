const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// services are an embedded doc objects, each Hospital 0:n services
const hospitalSchema = new Schema(
  {
    identifier: {
      type: String,
      required: true,
      unique: true
    },
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
    location: {
      type: { type: String },
      coordinates: [Number]
    },
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

hospitalSchema.index({ location: "2dsphere" });
const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
