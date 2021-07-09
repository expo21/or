const Order = require("../model/order.model");
const Counter = require("../model/counter.model");

//get counter
const getNextSequenceValue = async (queryString) => {
  try {
    let sequence_doc = await Counter.updateOne(
      { _id: queryString },
      { $inc: { sequence_value: 1 } },
      { new: true }
    );
    if (sequence_doc.ok === 1) {
      let doc = await Counter.findOne({ _id: queryString });
      return doc.sequence_value;
    }
    // return sequence_doc.sequence_value;
  } catch (error) {
    console.log(error);
  }
};

//create order
exports.createOrder = async (obj) => {
  try {
    let order_id = await getNextSequenceValue("productid");
    console.log(order_id);
    let newOrder = new Order({
      order_number: order_id,
      name: obj.step_1.name,
      email: obj.step_1.email,
      address: obj.step_1.address,
      tel: obj.step_1.tel,
      gender: obj.step_1.gender,
      garment_type: obj.step_2.garment_type,
      choose_style: obj.step_3.choose_style,
      fabric: obj.step_3.fabric,
      fitting: obj.step_3.fitting,
      custom: obj.step_3.custom,
      measurements: obj.step_4,
    });
    console.log(newOrder);
    let savedOrder = await newOrder.save();
    console.log(savedOrder);

    return savedOrder;
  } catch (error) {
    return error.message;
  }
};

//get order by name
exports.getOrderByName = async (obj) => {
  try {
    let searchResult = await Order.find({ $text: { $search: obj } });
    console.log(searchResult);
    if (searchResult) {
      return searchResult;
    }
  } catch (error) {
    console.log(error);
  }
};

//get order by order id
exports.getOrderByOrderId = async (orderId) => {
  try {
    let order = await Order.findOne({ order_number: orderId });
    console.log(order);
    if (order) {
      return order;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrder = async () => {
  try {
    let orders = await Order.find();
    return orders;
  } catch (error) {}
};
