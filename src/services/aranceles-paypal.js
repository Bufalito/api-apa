require("dotenv").config();
const PORT = process.env.PORT;
const URL_API_PAYPAL = process.env.URL_API_PAYPAL;

const createOrderService = async (body) => {
  console.log("Ruta por PayPal", body);

  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: body.valor,
        },
      },
    ],
    application_context: {
      brand_name: "APA",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${URL_API_PAYPAL}/capture-order`,
      cancel_url: `${URL_API_PAYPAL}/cancel-order`,
      /*   return_url: `http://localhost:3001/api/aranceles-paypal/capture-order`,
      cancel_url: `http://localhost:3001/api/aranceles-paypal/cancel-order`, */
    },
  };

  return order;
};
module.exports = { createOrderService };
