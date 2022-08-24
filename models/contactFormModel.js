const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactFormSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const ContactForm = mongoose.model("ContactForm", contactFormSchema);

module.exports = { ContactForm };