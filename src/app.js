const express = require('express');
const app = express();
 require('dotenv').config()
const home = require ("./router/home")
const cookie = require('cookie-parser')
const fileUpload = require('express-fileupload')

app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/src/public'))
app.use("/src/uploads",express.static(process.cwd() + '/src/uploads'))
app.use(cookie())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(home)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Internal listing port:",PORT);
});