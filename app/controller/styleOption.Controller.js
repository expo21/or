const StyleOption = require("../model/StyleOptions.model");
const GarmentType = require("../model/garments.model");
const Options = require("../model/Options.model");

exports.getAllAtyleOptionList = async () => {
  try {
    let list = await StyleOption.find({})
      .populate("options")
      .populate("garment_type");
    console.log(list);
    if (list.length > 0) {
      return list;
    }
  } catch (error) {
    console.log(error);
  }
};

//getStyleOptionByGarmentAndGender
exports.getStyleOptionByGarmentAndGender = async (garment, gender) => {
  try {
    let garment_id = await GarmentType.findOne(
      {
        $and: [{ title: garment }, { gender: gender }],
      },
      { _id: 1 }
    );
    let garmentId = garment_id._id;

    let styleOptions = await StyleOption.find(
      {
        garment_type: garmentId,
      },
      {
        options: 1,
        title: 1,
        custom: 1,
      }
    ).populate("options");

    console.log(styleOptions);
    return styleOptions;
  } catch (error) {
    console.log(error);
  }
};

///

exports.updateStyleOption = async (objId, dataObj) => {
  try {
    let updatedOption = await StyleOption.findByIdAndUpdate(objId, dataObj, {
      new: true,
    });
    if (updatedOption) {
      return updatedOption;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

///
exports.disbaleStyleOption = async (objId, dataObj) => {
  try {
    dataObj.status = 0;
    let disableOption = await StyleOption.findByIdAndUpdate(objId, dataObj, {
      new: true,
    });
    if (disableOption) {
      return disableOption;
    }
  } catch (err) {
    console.log(err);
  }
};

//
exports.addGramentToStyleOption = async (optionId, garment_type) => {
  console.log(optionId, garment_type);
  try {
    let updatedOption = await StyleOption.updateOne(
      { _id: optionId },
      { $push: { garment_type: garment_type } },
      { new: true }
    );
    console.log(updatedOption);
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};
