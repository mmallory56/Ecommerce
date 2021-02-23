import express from "express";
const router = express.Router();
import { protect,admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderItemById,
  getOrders,
  getUserOrders,
  updateOrderToPayed,
  updateOrderToShipped,
} from "../controller/orderController.js";

router.route("/").post(protect, addOrderItems).get(protect,admin,getOrders);
router.route("/userorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderItemById);
router.route("/:id/pay").put(protect, updateOrderToPayed);
router.route("/:id/shipped").put(protect,admin, updateOrderToShipped);
export default router;
