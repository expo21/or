const express = require("express");
const {
  getAllAtyleOptionList,
  addGramentToStyleOption,
  getStyleOptionByGarmentAndGender,
} = require("../controller/styleOption.Controller");

const router = express.Router();

const StyleOptions = require("../model/StyleOptions.model");

//add style options

router.post("/styleOptions", async (req, res) => {
  try {
    let newOption = new StyleOptions({
      title: req.body.title,
      garment_type: req.body.garment_type,
      status: 1,
      custom: req.body.custom,
      options: [],
    });
    let savedOption = await newOption.save();
    if (savedOption) {
      res.send({ status: true, msg: "Style option saved.", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
});

//get style option by garmnet type

router.get("/styleOptions/:garmentType/:gender", (req, res) => {
  console.log(req.params);
  getStyleOptionByGarmentAndGender(req.params.garmentType, req.params.gender)
    .then((result) => {
      if (result.length > 0) {
        res.send({ status: true, msg: "found", data: result });
      } else {
        res.send({ status: false, msg: "Not found", data: [] });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // StyleOptions.find({ garment_type: req.params.garmentType })
  //   .populate("options")
  //   .then((result) => {
  //     if (result) {
  //       res.send({ status: true, msg: "list found", data: result });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.get("/styleOptions", (req, res) => {
  getAllAtyleOptionList()
    .then((result) => {
      res.send({ status: true, msg: "List Found", data: result });
    })
    .catch((error) => {
      res.send({ status: false, msg: "Something went wrong.", data: [] });
    });
});

// disable style option
router.post("/updateStyleOption/:styleOption", (req, res) => {
  addGramentToStyleOption(req.params.styleOption, req.body.garment_type)
    .then((result) => {
      console.log(result);
      if (result.ok === 1)
        return res.send({ status: true, msg: "Garment type added.", data: [] });
      return res.send({
        status: false,
        msg: "Something went Wrong.",
        data: [],
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
