require('dotenv').config();

const { Newsletter } = require('../models/newsletterModel');
const { sendMail } = require("./mailservice")


async function subscribeToNewsletter(req, res) {
    try {
        let new_newsletter_sub = new Newsletter(req.body);
        await new_newsletter_sub.save();

        // Send subscirption Notification to admin
        let mail_data = {
            email: process.env.ADMIN_EMAIL_ADDRESS,
            title: "New newsletter subscription",
            message: `
                Email: ${req.body.email}
                Subscription id: ${new_newsletter_sub._id}
            `
        }
        await sendMail(mail_data);

        res.status(200).send(new_newsletter_sub);
    } catch (error) {
        if (error.code === 11000) {
            res.status(200).send("Email already exists");
        } else {
            console.log(error)
            unsubscribeFromNewsletter(req, res);
            // res.status(500).send(error.message)
        }

    }
}

async function unsubscribeFromNewsletter(req, res) {
    try {
        console.log(req.body)
        let response = await Newsletter.findOneAndDelete({ email: req.body.email });
        if (response) {
            console.log(response)
            res.status(200).send(response);
        } else {
            console.log(response)
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getAllSubscriptions(req, res) {
    try {
        let response = await Newsletter.find();
        if (response) { res.status(200).send(response); }
        else { res.status(404).send("Not found"); }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



module.exports = {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getAllSubscriptions
}