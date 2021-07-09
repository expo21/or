const Garment = require("../model/garments.model");

exports.createGarmentOption = async (dataObj) => {
  try {
    let NewGarmentType = new Garment({
      title: dataObj.title,
      gender: dataObj.gender,
      image: dataObj.image,
      status: 1,
    });
    let savedObj = await NewGarmentType.save();
    console.log(savedObj);
    return savedObj;
  } catch (error) {
    console.log(error);
  }
};

exports.garmetsByGender = async (gender) => {
  try {
    let garmentList = await Garment.find({ gender, status: 1 });
    if (garmentList.length > 0) {
      return garmentList;
    } else {
      return [];
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

exports.getAllGarments = async () => {
  try {
    let list = await Garment.find({});
    return list;
  } catch (error) {
    console.log(error);
  }
};
