const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalServiceSchema = new Schema(
  {
    identifier: String,
    pathology: String,
    patientType: String,
    phoneNumber: String,
    openingDays: String,
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const hospitalService = mongoose.model(
  "hospitalService",
  hospitalServiceSchema
);
module.exports = hospitalService;
