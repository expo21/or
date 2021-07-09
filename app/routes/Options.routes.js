const Option = require("../model/Options.model");
const StyleOption = require("../model/StyleOptions.model");

const express = require("express");
const {
  getAllOptionList,
  addGarmentToOptions,
  removeGarmentFromOption,
} = require("../controller/options.controller");

const router = express.Router();

//add option to the styles
router.post("/options/addOptions", async (req, res) => {
  try {
    const newOption = new Option({
      title: req.body.title,
      input_type: req.body.input_type,
      garment_type: req.body.garment_type,
      style_option: req.body.style_option,
      status: 1,
    });
    const savedOption = await newOption.save();
    if (savedOption) {
      let saveToStyle = await StyleOption.updateOne(
        { _id: req.body.style_option },
        { $push: { options: savedOption._id } }
      );
      if (saveToStyle) {
        res.send({ status: true, msg: "option added.", data: [] });
      }
    }
  } catch (error) {
    res.send({ status: false, msg: "Something went wrong.", data: [] });
  }
});

//get all options list
router.get("/options/optionsList", (req, res) => {
  getAllOptionList()
    .then((result) => {
      if (result) {
        return res.send({ status: true, msg: "Options list.", data: result });
      }
      return res.send({ status: false, msg: "List not Found.", data: [] });
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

//add garment type to the options of style
router.post("/options/addGarmentToOptions", (req, res) => {
  addGarmentToOptions()
    .then((result) => {
      if (result) {
        res.send({ status: true, msg: "update done.", data: [] });
      }
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

//remove garment type to the options of style
router.post("/options/removeGarmentFromOptions", (req, res) => {
  removeGarmentFromOption()
    .then((result) => {
      if (result) {
        res.send({ status: true, msg: "update done.", data: [] });
      }
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

module.exports = router;
