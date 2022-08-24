require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require("express");
const app = express();
const connectDatabase = require("./db/connectDB");


const PORT = process.env.PORT;
const mailRoute = require('./routes/contactformRoute')

app.use((req, res, next) => {
    const allowedOrigins = ["https://www.realrichi3.github.io"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use(morgan("tiny"));
app.use(express.json());

app.use('/api/contactform', mailRoute)

const start = async () => {
    try {
        // Initialize database
        await connectDatabase(process.env.MONGO_URI)

        // Express
        app.listen(PORT, function () {
            console.log(`Server is running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()