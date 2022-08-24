const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    email: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Newsletter = mongoose.model("NewsLetterSignup", newsletterSchema);

module.exports = { Newsletter };