/*
    reference: https://node-postgres.com/features/transactions

*/

const express = require("express");
const cors = require("cors")
const fileUpload = require('express-fileupload');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const bodyParser = require('body-parser');

const db = require('./queries')


const DEBUG = false
const VERSION  = '0.0.1'
const VERSION_DATE  = '2023-05-13 00:00'
const VERSION_DESCR = {
    '0.0.1': 'inicial services'
}

const PORT = 3001;
const oneDay = 1000 * 60 * 60 * 24;
const app = express();

const error_handler = async (err, req, res, next) => {
    if(DEBUG){
        console.error(err); 
    }
    if(err.status === 400)
      return res.status(err.status).json({message : "Invalid Json, please check and send again"});
 }

app.set("trust proxy", 1);

app.use(sessions({
    secret: "sRRI1b6UVNsrNb3BykNKt7vn2iJi4dZR0piLVsLjKdoVT13K2bOj4hvc/5tM6yTVCQHdo1PLRmCX",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, sameSite: "None", secure: true, httpOnly: true },
    resave: false
}),cors({origin: ['*'],credentials: true}));

app.use(cookieParser());
app.use(bodyParser.text())
app.use(bodyParser.json({limit: '128mb'}))
app.use(bodyParser.urlencoded({ extended: false }));


//UPLOAD FILES
app.use(fileUpload({createParentPath: true}));

//CHECK IF JSON IS OK
app.use(error_handler);

app.get("/", async (req, res) => {
    res.json(
        {
            info : 'ok',
            version: VERSION,
            version_description: VERSION_DESCR,
            date: VERSION_DATE,
            client: req.socket.remoteAddress
        })
});


/* SET AND GET ALL POINTS*/

app.post("/v1/virt_control/vmData",db.setData);
app.post("/v1/virt_control/vmMassData",db.setMassData);

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})