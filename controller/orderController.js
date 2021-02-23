
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
//@ desc Fetch all order
//@route get /api/order
//@access Public
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //console.log(req.body);
  //console.log(req.user._id);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id.toString(),

      orderItems,
      shippingAddress,
      paymentMethod: req.body.paymentMethod.toString(),

      taxPrice: Number(req.body.taxPrice),
      shippingPrice: Number(req.body.shippingPrice),

      totalPrice: Number(req.body.totalPrice),
    });

    const createOrder = await order.save();
    console.log(createOrder);
    res.status(201).json(createOrder);
  }
});
//@ desc Fetch all order
//@route get /api/order
//@access Public
const getOrderItemById = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const order = await Order.findOne({ _id: id });
  const user = await User.findById(order.user, "name email");

  console.log(user._id);

  console.log(req.user._id);

  if (order && (user._id.toString() === req.user._id.toString()||req.user.isAdmin)) {
    res.status(200).json({ order, user });
  } else {
    res.status(404);
    throw new Error("Order Item not Found");
    return;
  }
});
//@ desc Fetch all order
//@route get /api/order/:id/pay
//@access Public
const updateOrderToPayed = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const order = await Order.findOne({ _id: id });
  const user = await User.findById(order.user, "name email");

  console.log("user Payed");
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const saveOrder = await order.save();

    res.json({ Message: "Order Payed", order });
  } else {
    res.status(404);
    throw new Error("Order Not Paid Please Contact Assistance");
    return;
  }
});


const updateOrderToShipped = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const order = await Order.findOne({ _id: id });
  const user = await User.findById(order.user, "name email");
console.log(req.user)
  console.log("user Payed");
  if (order) {
    order.isShipped = true;
   order.ShippedAt = Date.now();

    const saveOrder = await order.save();

    res.json({  saveOrder });
  } else {
    res.status(404);
    throw new Error("Order Not Paid Please Contact Assistance");
    return;
  }
});
//@ desc Fetch all orders
//@route get /api/orders
//@access Protected
const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json({ orders });
  } else {
    res.status(404);
    throw new Error("Orders Not Found");
    return;
  }
});
const getOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user","_id name");
    
    res.json(orders);
  } catch (error) {
    
    throw error;
    res.status(404).send("error happend");
  }

  // if (orders) {
  //  // res.status(200).json({ orders });
  // } else {
  //  // res.status(404);
  // //  throw new Error("Orders Not Found");
  //   return;
  // }
});

export {
  addOrderItems,
  getOrderItemById,
  updateOrderToPayed,
  getUserOrders,
  getOrders,
  updateOrderToShipped
};
