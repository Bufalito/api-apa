const { mongoose } = require("mongoose");

const schemaItems = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const compraSchema = new mongoose.Schema({
  order: {
    type: {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  },
  payer: {
    type: userSchema,
    required: true,
  },
  payment_method: {
    type: {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      issuer_id: {
        type: String,
        required: true,
      },
    },
  },
  items: {
    type: [schemaItems],
    required: true,
  },
});

exports.compraSchema = mongoose.model("CompraMP", compraSchema);
