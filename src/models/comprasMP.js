const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para el subdocumento identification
const IdentificationSchema = new Schema(
  {
    number: { type: String, default: null, required: false },
    type: { type: String, default: null, required: false },
  },
  { _id: false }
);

// Esquema para el subdocumento phone
const PhoneSchema = new Schema(
  {
    number: { type: String, default: null },
    extension: { type: String, default: null },
    area_code: { type: String, default: null },
  },
  { _id: false }
);

// Esquema para el subdocumento payer
const PayerSchema = new Schema(
  {
    identification: { type: IdentificationSchema, required: true },
    entity_type: { type: String, default: null },
    phone: { type: PhoneSchema, required: true },
    last_name: { type: String, default: null },
    id: { type: String, required: true },
    type: { type: String, default: null },
    first_name: { type: String, default: null },
    email: { type: String, required: true },
  },
  { _id: false }
);

// Esquema para el subdocumento payment_method
const PaymentMethodSchema = new Schema(
  {
    id: { type: String, required: true },
    issuer_id: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

// Esquema para el subdocumento items
const ItemSchema = new Schema(
  {
    category_id: { type: String, default: null },
    description: { type: String, required: true },
    id: { type: String, required: true },
    picture_url: { type: String, default: null },
    quantity: { type: String, required: true },
    title: { type: String, required: true },
    unit_price: { type: String, required: true },
  },
  { _id: false }
);

// Esquema principal
const OrderSchema = new Schema({
  order: {
    id: { type: String, required: true },
    type: { type: String, required: true },
  },
  payer: { type: PayerSchema, required: true },
  payment_method: { type: Schema.Types.Mixed, required: true },
  items: { type: [ItemSchema], required: true },
});

const Order = mongoose.model("CompraMP", OrderSchema);

module.exports = Order;
