require("dotenv").config();
const { MOCKE_ARANCELES } = require("../models/aranceles");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { senMail } = require("../config/mailer");

//const URL_API_MP = process.env.URL_API_MP;
const URL_API_MP = process.env.URL_API_MP;
const URL_API_DESARROLLO = process.env.URL_API_DESARROLLO;
const ACCES_TOKEN_MP = process.env.ACCES_TOKEN_MP;

const client = new MercadoPagoConfig({
  accessToken: ACCES_TOKEN_MP,
});
const preference = new Preference(client);
const payment = new Payment(client);

const getAllAranceles = () => {
  return MOCKE_ARANCELES;
};

const createOrderService = async (body) => {
  try {
    const result = await preference.create({
      body: {
        payment_methods: {
          excluded_payment_methods: [
            {
              id: "argencard",
            },
            {
              id: "cabal",
            },
            {
              id: "cmr",
            },
            {
              id: "cencosud",
            },
            {
              id: "cordobesa",
            },
            {
              id: "diners",
            },
            {
              id: "naranja",
            },
            {
              id: "tarshop",
            },
          ],
          excluded_payment_types: [
            {
              id: "ticket",
            },
          ],
          installments: 1,
        },
        items: [
          {
            id: body.id,
            title: body.tipo,
            quantity: 1,
            unit_price: body.valor,
            currency_id: body.moneda,
            description: body.concepto,
          },
        ],
        back_urls: {
          success: `${URL_API_MP}/success`,
          pending: `${URL_API_MP}/pending`,
          failure: `${URL_API_MP}/failure`,
        },
        notification_url: `${URL_API_MP}/webhook`,
      },
    });
    console.log(result.init_point);
    return result.init_point;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrderWebHookService = async (pay) => {
  try {
    if (pay.type === "payment") {
      const data = await payment.get({ id: pay["data.id"] });
    }
    return "OK";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrderSuccess = async (pay) => {
  try {
    const data = await payment.get({ id: pay.payment_id });

    const response = {
      order: data.order,
      payer: data.payer,
      payment_method: data.payment_method,
      items: data.additional_info.items,
    };
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createOrderService,
  createOrderWebHookService,
  createOrderSuccess,
};
