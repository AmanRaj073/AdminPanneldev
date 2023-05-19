const mongoose = require("mongoose");
const schema = mongoose.Schema
const model = new schema(
  {
    image: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: schema.Types.ObjectId,
      ref:"position",
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = new mongoose.model("UserMan", model);