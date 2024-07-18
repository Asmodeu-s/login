const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4:uuidv4} = require("uuid");

const router = require("./router")

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true})); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//load static asset
app.use('/static',express.static(path.join(__dirname,"public")));
app.use('/assets',express.static(path.join(__dirname,"public/assets")))

app.use(session({
	secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/route',router);

//HOME ROUTE
 
app.get('/',(req,res)=>{
	res.render('base',{title: "Login System"});
})

app.listen(port,()=>{
	console.log("Listening to the server on http://localhost:3000")
})