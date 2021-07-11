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
      garment_style: obj.step_3.garment_style,
      ready_style_number: obj.step_3.ready_style_number,
      fabric: obj.step_3.fabric,
      fitting: obj.step_3.fitting,
      custom: obj.custom,
      measurements: obj.step_4,
    });

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

    if (order) {
      return {
        step_1: {
          name: order.name,
          email: order.email,
          address: order.address,
          tel: order.tel,
          gender: order.gender,
          order_number: order.order_number,
        },
        step_2: { garment_type: order.garment_type },
        step_3: {
          garment_style: order.garment_style,
          ready_style_number: order.ready_style_number,
          fabric: order.fabric,
          fitting: order.fitting,
        },
        step_4: order.measurements || {},
        custom: order.custom,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrder = async () => {
  try {
    let orders = await Order.find(
      {},
      { measurements: 0, updatedAt: 0, __v: 0 }
    );
    let arr = orders.map((obj) => {
      return {
        order_number: obj.order_number,
        name: obj.name,
        email: obj.email,
        address: obj.address,
        tel: obj.tel,
        garment_type: obj.garment_type,
        fitting: obj.fitting,
        fabric: obj.fabric,
        garment_style: obj.garment_style,
        booking: obj.booking,
        status: obj.status,
      };
    });
    return arr;
  } catch (error) {}
};
