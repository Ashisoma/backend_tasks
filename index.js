const express = require('express');
const app = express();
const xss = require('xss-clean');
require('dotenv').config();

const port = process.env.PORT || 5000;


// import db connection
const connectDatabase = require('./src/db/db');

const isAuthenticated = require('./src/middlewares/authenticateToken')

const apiRouting = require("./src/routes/tasksRouting");
const authRouting = require("./src/routes/userRouting");

// connect to db
connectDatabase();

// Data Sanitization
app.use(xss());

// set up middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended:false
    })
);

// app.listen(port, () => console.log(`Server running on port ${port}`));

// SET HEADERS 
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');
    res.setHeader('Content-Security-Policy', 'frame-ancestors *');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, UPDATE,DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// tasks routing
// authenticated api key routing below
app.use("/api/v1", apiRouting);

// auth routes
app.use("/auth", authRouting);

module.exports = app;