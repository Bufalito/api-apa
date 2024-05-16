const express = require("express");
const router = express.Router();
const {
  createOrderController,
  captureOrderController,
  cancelOrderController,
  pendingOrderController,
  createOrderWebHookController,
} = require("../controllers/aranceles-paypal");


//const { checkOrigin } = require("../middlewares/origin");
router.post("/create-order", createOrderController);
router.get("/capture-order", captureOrderController);
router.get("/cancel-order", cancelOrderController);

//router.post("/webhook", createOrderWebHookController);

module.exports = router;
