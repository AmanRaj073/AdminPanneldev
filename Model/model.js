const mongoose = require("mongoose")

const model = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
},{
    timestamps: true,
    versionKey:false
})

module.exports = new mongoose.model("blogmodel", model)