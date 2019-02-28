const express = require("express");

const Hospital = require("../models/hospital.js");

const router = express.Router();

router.get("/hospitals", (req, res, next) => {
  Hospital.find()
    .sort({ createdAt: -1 })
    .limit(20)
    // send the DB query results array as a JSON response to the client
    .then(phoneResult => res.json(phoneResult))
    .catch(err => next(err));
});

router.get("/hospitals/:hospitalId", (req, res, next) => {
  const { hospitalId } = req.params;
  Hospital.findById(hospitalId)
    .then(hospitalDoc => res.json(hospitalDoc))
    .catch(err => next(err));
});

module.exports = router;
