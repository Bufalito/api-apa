require("dotenv").config();
const axios = require("axios");

const URL_FRONT_DESARROLLO = process.env.URL_FRONT_DESARROLLO;
const paypal_secret = process.env.PAYPAL_API_SECRET;
const paypal_client = process.env.PAYPAL_API_CLIENT;
const paypal_api = process.env.PAYPAL_API;

const { createOrderService } = require("../services/aranceles-paypal");

const createOrderController = async (req, res) => {
  const { body } = req;
  //console.log("controller", req.body);
  const order = await createOrderService(body);

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const {
    data: { access_token },
  } = await axios.post(
    `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
    params,
    {
      auth: {
        username: paypal_client,
        password: paypal_secret,
      },
    }
  );
  const response = await axios.post(`${paypal_api}/v2/checkout/orders`, order, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  console.log(response.data);

  res.json(response.data);
};
const captureOrderController = async (req, res) => {
  const { token } = req.query;
  console.log("Token capturado - CAPUTERE ORDER", token);

  const response = await axios.post(
    `${paypal_api}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: paypal_client,
        password: paypal_secret,
      },
    }
  );

  console.log(response.data); //Esto debo guardarlo en la DB - esta la informacion del usuario

  res.redirect(
    `${URL_FRONT_DESARROLLO}checkout?id=${response.data.id}&given_name=${response.data.payer.name.given_name}&surname=${response.data.payer.name.surname}&email=${response.data.payer.email_address}`
  );
};

const cancelOrderController = async (req, res) => {
  res.redirect("/");
};

module.exports = {
  createOrderController,
  captureOrderController,
  cancelOrderController,
};
