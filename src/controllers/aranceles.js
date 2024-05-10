const {
  createOrderService,
  createOrderWebHookService,
} = require("../services/aranceles");

const createOrderController = async (req, res) => {
  const { body } = req;
  console.log("controller", req.body);
  const response = await createOrderService(body);
  res.send({ data: response });
};

const succesOrderController = async (req, res) => {
  res.send({ data: "Payment succes" });
};
const failureOrderController = async (req, res) => {
  res.send({ data: "Payment failure" });
};
const pendingOrderController = async (req, res) => {
  res.send({ data: "Payment pending" });
};

const createOrderWebHookController = async (req, res) => {
  console.log(req.query); //Obtengo el id lo puedo guardar en la DB
  const payment = req.query;

  const response = await createOrderWebHookService(payment);
  res.status(204).send({ data: response });
};

module.exports = {
  createOrderController,
  succesOrderController,
  failureOrderController,
  pendingOrderController,
  createOrderWebHookController,
};
