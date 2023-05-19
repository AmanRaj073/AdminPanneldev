const mongoose = require("mongoose");

const title = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
  },{
    timestamps: true,
    versionKey: false,
  }
);

module.exports = new mongoose.model("position", title);
