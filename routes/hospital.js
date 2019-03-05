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

router.get("/hospitals/near", (req, res, next) => {
  let { latitude = 48.864716, longitude = 2.349014, radius = 2500 } = req.query;

  // axios request structure as follow
  //  http://localhost:2999/api/hospitals/near?latitude=48.867250&longitude=2.363540&radius=5000
  //  2.363540 (republique)
  // using mongoDB near

  Hospital.find({
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

  //"end"
});

module.exports = router;
