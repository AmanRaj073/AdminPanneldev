const mongoose = require("mongoose")

const model = new mongoose.Schema(
  {
    article: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = new mongoose.model("Blogs",model)