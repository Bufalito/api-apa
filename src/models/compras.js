const mongoose = require("mongoose");

// Definir el esquema de nombre
const nameSchema = new mongoose.Schema({
  given_name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
});

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: nameSchema,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  payer_id: {
    type: String,
    required: true,
  },
  address: {
    type: new mongoose.Schema({
      country_code: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
});

// Definir el esquema de item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit_amount: {
    type: new mongoose.Schema({
      currency_code: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Definir el esquema de compra
const compraSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payer: {
    type: userSchema,
    required: true,
  },
  purchase_units: {
    type: itemSchema,
    required: true,
  },
});

module.exports = mongoose.model("Compra", compraSchema);
