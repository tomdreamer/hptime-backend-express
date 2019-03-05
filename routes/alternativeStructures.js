const express = require("express");
const AlternativeFacility = require("../models/AlternativeFacility");
const router = express.Router();

// get nearest structures from lat lng
router.get("/alternatives-structures/near", (req, res, next) => {
  let { latitude = 48.864716, longitude = 2.349014, radius = 2500 } = req.query;

  // axios request structure as follow
  //  http://localhost:2999/api/alternatives-structures/near?latitude=48.867250&longitude=2.363540&radius=5000

  AlternativeFacility.find({
    location: {
      $near: {
        $maxDistance: radius,
        $geometry: {
          type: "Point",
          coordinates: [latitude, longitude]
        }
      }
    }
  })
    .then(result => res.json(result))
    .catch(error => {
      if (error) console.log(error);
    });
});

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
