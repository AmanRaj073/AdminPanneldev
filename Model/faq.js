
const mongoose = require("mongoose")

const faqm = new mongoose.Schema({
    question: {
        type: String,
        required:true,
    },
    answer: {
        type: String,
        required:true,
    }
}, {
    timestamps: true,
    versionKey:false
})

module.exports = new mongoose.model("FAq",faqm)