import axios from "axios";

// add garment
export const addGarment = async (formData) => {
  try {
    let response = await axios.post(
      `${window.APIPATH}/api/garmentType`,
      formData
    );
    if (response.data.status) {
      return response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};

// add style Option
export const addStyleOption = async (formData) => {
  try {
    let response = await axios.post(
      `${window.APIPATH}/api/styleOptions`,
      formData
    );
    if (response.data.status) {
      return response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};

// get garment list
export const getGarmentList = async () => {
  try {
    let response = await axios.get(`${window.APIPATH}/api/allGarments`);
    if (response.data.status) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// add garment style list
export const getGarmentStyleList = async () => {
  try {
    let response = await axios.get(`${window.APIPATH}/api/styleOptions`);
    if (response.data.status) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//get all style Options
export const getStyleOptionsList = async () => {
  try {
    let response = await axios.get(`${window.APIPATH}/api/options/optionsList`);
    if (response.data.status) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// add new Option
export const addOption = async (formData) => {
  try {
    let response = await axios.post(
      `${window.APIPATH}/api/options/addOptions`,
      formData
    );
    if (response.data.status) {
      return response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};

//get all orders

export const getOrderList = async () => {
  try {
    let response = await axios.get(`${window.APIPATH}/api/order`);
    if (response.data.status) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//get order by orderId

export const getOrderDetails = async (orderNumber) => {
  try {
    let response = await axios.get(
      `${window.APIPATH}/api/orderByOrderId/${orderNumber}`
    );
    if (response.data.status) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//get garments by gender

export const garmentListByGender = async (gender) => {
  try {
    let response = await axios.get(
      `${window.APIPATH}/api/garmentsByGender/${gender}`
    );
    console.log(response);
    if (response.data.status) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

//get style options by garment and gender
export const getStyleOptionsByGarmentType = async (garment_type, gender) => {
  try {
    let response = await axios.get(
      `${window.APIPATH}/api/styleOptions/${garment_type}/${gender}`
    );
    if (response.data.status) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {}
};
