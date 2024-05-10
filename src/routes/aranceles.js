const express = require("express");
const router = express.Router();
const {
  createOrderController,
  succesOrderController,
  failureOrderController,
  pendingOrderController,
  createOrderWebHookController
} = require("../controllers/aranceles");

const { checkOrigin } = require("../middlewares/origin");

//router.get("", checkOrigin, getList);
router.post("", createOrderController);
router.get("/succes", succesOrderController);
router.get("/failure", failureOrderController);
router.get("/pending", pendingOrderController);

router.post("/webhook", createOrderWebHookController);


module.exports = router;
