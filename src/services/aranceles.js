const { MercadoPagoConfig, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCES_TOKEN_MP,
});
const preference = new Preference(client);

const { MOCKE_ARANCELES } = require("../models/aranceles");

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
          },
        ],
        back_urls: {
          success: "http://localhost:3001/api/aranceles/success",
          pending: "http://localhost:3001/api/aranceles/pending",
          failure: "http://localhost:3001/api/aranceles/failure",
        },
        notification_url:
          "https://5558-190-246-234-201.ngrok-free.app/api/aranceles/webhook",
      },
    });

    console.log(result);
    return result.init_point;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrderWebHookService = async (payment) => {
  try {
    if (payment.type === "payment") {
      const data = await preference.get({ preferenceId: payment["data.id"] });
      //const data = await preference.search();
      console.log("PAYMENT", data);
      //Guardar en base de datos
    }
    return "OK";
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { createOrderService, createOrderWebHookService };
