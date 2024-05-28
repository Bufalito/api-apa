require("dotenv").config();
const axios = require("axios");
const compraSchema = require("../models/compras");
const { createOrderService } = require("../services/aranceles-paypal");
const { senMail } = require("../config/mailer");

const {
  URL_FRONT_DESARROLLO,
  URL_FRONT_ORIGIN,
  PAYPAL_API_SECRET,
  PAYPAL_API_CLIENT,
  PAYPAL_API,
} = process.env;

const createOrderController = async (req, res) => {
  try {
    const { body } = req;
    const order = await createOrderService(body);

    const authHeader = {
      Authorization: `Basic ${Buffer.from(
        `${PAYPAL_API_CLIENT}:${PAYPAL_API_SECRET}`
      ).toString("base64")}`,
    };

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...authHeader,
        },
      }
    );

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error en createOrderController:", error);
    res.status(500).json({ error: "Error en createOrderController" });
  }
};

const captureOrderController = async (req, res) => {
  try {
    const { token } = req.query;

    console.log("Token capturado - CAPUTERE ORDER", token);

    const authHeader = {
      Authorization: `Basic ${Buffer.from(
        `${PAYPAL_API_CLIENT}:${PAYPAL_API_SECRET}`
      ).toString("base64")}`,
    };

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      { headers: { "Content-Type": "application/json", ...authHeader } }
    );

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...authHeader,
        },
      }
    );

    const responseDetails = await axios.get(`${response.data.links[0].href}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("responseDetails", responseDetails.data); // Esto debo guardarlo en la DB - esta la informacion del usuario
    if (response.data.status === "COMPLETED") {
      const compra = {
        id: responseDetails.data.id,
        status: responseDetails.data.status,
        payer: responseDetails.data.payer,
        purchase_units: responseDetails.data.purchase_units[0].items[0],
      };

      const savedCompra = await compraSchema(compra).save();
      const responseEmail = {
        id: savedCompra.id,
        description: savedCompra.purchase_units.description,
        user_email: savedCompra.payer.email_address,
      };
      senMail(responseEmail);
      res.redirect(
        `${URL_FRONT_ORIGIN}checkout?id=${response.data.id}&given_name=${response.data.payer.name.given_name}&surname=${response.data.payer.name.surname}&email=${response.data.payer.email_address}`
      );
    } else {
      res.redirect(`${URL_FRONT_ORIGIN}`);
    }
  } catch (error) {
    console.error("Error en captureOrderController:", error);
    res.status(500).json({ error: "Error en captureOrderController" });
  }
};

const cancelOrderController = async (req, res) => {
  res.redirect(`${URL_FRONT_ORIGIN}`);
};

module.exports = {
  createOrderController,
  captureOrderController,
  cancelOrderController,
};
