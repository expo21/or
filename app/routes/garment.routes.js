const express = require("express");
const {
  createGarmentOption,
  garmetsByGender,
  getAllGarments,
} = require("../controller/garments.controller");
const multer = require("multer");

const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/routes/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//create
router.post("/garmentType", upload.single("image"), (req, res) => {
  let dataObj = {
    title: req.body.title,
    gender: req.body.gender,
    image: req.file.filename,
  };
  console.log(dataObj);
  createGarmentOption(dataObj)
    .then((result) => {
      if (!result)
        res.send({ status: false, msg: "Something went wrong.", data: [] });
      res.send({ status: true, msg: "New garment type is added. ", data: [] });
    })
    .catch();
});

//get garments type by gender
router.get("/garmentsByGender/:gender", (req, res) => {
  garmetsByGender(req.params.gender)
    .then((result) => {
      if (result.length > 0) {
        return res.send({ status: true, message: "List found ", data: result });
      } else {
        return res.send({
          status: false,
          message: "List not found ",
          data: result,
        });
      }
    })
    .catch();
});

//all garment types
router.get("/allGarments", (req, res) => {
  getAllGarments()
    .then((result) => {
      if (result.length > 0) {
        res.send({ status: true, msg: "List found", data: result });
      } else {
        res.send({ status: false, msg: "something went wrong.", data: [] });
      }
    })
    .catch((error) => {
      res.send({ status: false, msg: "something went wrong.", data: [] });
    });
});

module.exports = router;
