require('dotenv').config();

const { ContactForm } = require('../models/contactFormModel');
const { sendMail } = require("./mailservice")


async function addNewContactForm(req, res) {
    try {
        let new_contactform = new ContactForm(req.body);
        await new_contactform.save();
        // Send email to admin -> contains contact form data
        let mail_data = {
            email: process.env.ADMIN_EMAIL_ADDRESS,
            title: `Contact form submission from ${new_contactform.email}`,
            message: `
                Name: ${req.body.name}
                Email: ${req.body.email}
                Message: ${req.body.message}
                Form id: ${new_contactform._id}
            `
        }
        await sendMail(mail_data);

        res.status(200).send(new_contactform);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function getContactForm(req, res) {
    try {
        let response = await ContactForm.find({ _id: req.body._id });
        if (response) {
            console.log(response)
            res.status(200).send(response);
        } else {
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getAllContactForms(req, res) {
    try {
        let response = await ContactForm.find();
        if (response) {
            res.status(200).send(response);
        } else { 
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function updateContactForm(req, res) {
    try {
        let response = await ContactForm.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (response) {
            console.log(response)
            res.status(200).send(response);
        } else {
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function deleteContactForm(req, res) {
    try {
        let response = await ContactForm.findByIdAndDelete(req.body._id);
        if (response) {
            console.log(response)
            res.status(200).send(response);
        } else {
            res.status(404).send("Not found");
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



module.exports = {
    addNewContactForm,
    getAllContactForms,
    updateContactForm,
    deleteContactForm,
    getContactForm,
}
