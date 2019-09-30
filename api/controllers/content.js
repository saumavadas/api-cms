const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/content");

module.exports.insert = (req, res, next) =>
{
	console.log("On Content insert");
	res.status(200).json(
	{
        message: "Hello World"
    });	
}
module.exports.view_by_id = (req, res, next) =>
{
	console.log("On Content view_by_id");
	res.status(200).json(
	{
        message: "Hello World view_by_id"
    });	
}

