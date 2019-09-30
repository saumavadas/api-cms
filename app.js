const http = require('http');

const express 		= require("express");
const app 			= express();
const morgan 		= require("morgan");
const bodyParser 	= require("body-parser");
const mongoose 		= require("mongoose");

const userRoutes 	= require('./api/routes/user');
const indexRoutes 	= require('./api/routes/index');
const contentRoutes	= require('./api/routes/content');

mongoose.connect("mongodb://localhost:27017/api-cms",{useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => 
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") 
	{
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

// Routes which should handle requests
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/content", contentRoutes);

app.use((req, res, next) => 
{
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => 
{
	res.status(error.status || 500);
	res.json(
	{
	    error: 
	    {
	      message: error.message
	    }
	});
});
module.exports = app;

const PORT = process.env.PORT || 5004;
app.listen(PORT, console.log(`Server started on port ${PORT}`));