const express = require("express");
const Hospital = require("../models/hospital");
const router = express.Router();

router.get("/hospital/:hospitalIdentifier([0-9]+)", (req, res, next) => {
  const { hospitalIdentifier } = req.params;
  Hospital.findOne({ identifier: hospitalIdentifier })
    //  .select("latitude longitude")
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.get("/hospitals", (req, res, next) => {
  let { offset = 0, size = 5 } = req.query;

  if (size > 200) {
    size = 200;
  }

  Hospital.find()
    .sort({ createdAt: -1 })
    .limit(parseInt(size))
    .skip(parseInt(offset))
    .then(result => res.json(result))
    .catch(err => next(err));
});

module.exports = router;
