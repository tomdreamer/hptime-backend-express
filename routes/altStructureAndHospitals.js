const express = require("express");
const AlternativeFacility = require("../models/AlternativeFacility");
//const Hospital = require("../models/hospital");
const router = express.Router();

router.get("/structure-details/:structureId", (req, res, next) => {
  const { structureId } = req.params;
  AlternativeFacility.findById(structureId)
    // send the DB query result document as a JSON response to the client
    .then(structureDoc => {
      console.log(structureDoc);
      if (!structureDoc) {
        Hospital.findById(structureId).then(structureDoc =>
          res.json(structureDoc)
        );
      } else {
        res.json(structureDoc);
      }
    })
    .catch(err => next(err));
});

module.exports = router;
