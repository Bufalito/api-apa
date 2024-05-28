require("dotenv").config();

const {
  createOrderService,
  createOrderWebHookService,
  createOrderSuccess,
} = require("../services/aranceles");

const Order = require("../models/comprasMP");
const { senMail } = require("../config/mailer");

const { Transporter } = require("../config/mailer");
const URL_FRONT_DESARROLLO = process.env.URL_FRONT_DESARROLLO;
const URL_FRONT_ORIGIN = process.env.URL_FRONT_ORIGIN;

const createOrderController = async (req, res) => {
  const { body } = req;
  const response = await createOrderService(body);
  res.send({ data: response });
};

const succesOrderController = async (req, res) => {
  const payment = req.query;

  const response = await createOrderSuccess(payment);
  console.log("RESPONSE SUCCESS", response);

  const savedCompra = await Order(response).save();

  const responseEmail = {
    id: response.order.id,
    description: response.items[0].description,
    user_email: response.payer.email,
  };
  senMail(responseEmail);

  res.redirect(
    `${URL_FRONT_ORIGIN}checkout?id=${response.order.id}&given_name=${response.payer.first_name}&surname=${response.payer.last_name}&email=${response.payer.email}`
  );
};
const failureOrderController = async (req, res) => {
  res.send({ data: "Payment failure" });
};
const pendingOrderController = async (req, res) => {
  res.send({ data: "Payment pending" });
};

const createOrderWebHookController = async (req, res) => {
  // console.log(req.query); //Obtengo el id lo puedo guardar en la DB
  const payment = req.query;
  const response = await createOrderWebHookService(payment);
  console.log("HOOK", response);

  res.status(204).send({ data: response });
};

module.exports = {
  createOrderController,
  succesOrderController,
  failureOrderController,
  pendingOrderController,
  createOrderWebHookController,
};
