const Options = require("../model/Options.model.js");

exports.getAllOptionList = async () => {
  try {
    let list = await Options.find({});
    if (list.length > 0) {
      return list;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

exports.addGarmentToOptions = async (objId, dataObj) => {
  try {
    let updatedObj = await Options.updateOne(
      { _id: objId },
      { $push: { garment_type: dataObj } }
    );
    if (updatedObj) return updatedObj;
    else return false;
  } catch (error) {
    return false;
  }
};

exports.removeGarmentFromOption = async (objId, dataObj) => {
  try {
    let updatedObj = await Options.updateOne(
      { _id: objId },
      { $pull: { garment_type: dataObj } }
    );
    if (updatedObj) return updatedObj;
    else return false;
  } catch (error) {
    return false;
  }
};
