const express = require("express");
const AlternativeFacility = require("../models/AlternativeFacility");
const router = express.Router();

// get one (using mongodb _id since there is no other way)
router.get(
  "/alternatives-structures/:AlternativeFacilityId",
  (req, res, next) => {
    const { AlternativeFacilityId } = req.params;
    AlternativeFacility.findById({ _id: AlternativeFacilityId })
      .then(result => res.json(result))
      .catch(err => next(err));
  }
);
// get many with limit and offset for pagination
router.get("/alternatives-structures", (req, res, next) => {
  let { offset = 0, size = 5 } = req.query;

  if (size > 200) {
    size = 200;
  }

  AlternativeFacility.find()
    .sort({ createdAt: -1 })
    .limit(parseInt(size))
    .skip(parseInt(offset))
    .then(result => res.json(result))
    .catch(err => next(err));
});

module.exports = router;
