const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Content = require("../models/content");

module.exports.insert = (req, res, next) =>
{
	if( req.body.title == "" )
	{
		return res.status(401).json({   message: "title is empty"});
	}
	else if( req.body.category == "" )
	{
		return res.status(401).json({   message: "category is empty"});
	}
	else if( req.body.conteny_type == "" )
	{
		return res.status(401).json({   message: "conteny_type is empty"});
	}
	else
	{
		const content = new Content(
		{
			_id: new mongoose.Types.ObjectId(),
			title : req.body.title,
			alias : req.body.alias,
			category : req.body.category,
			conteny_type : req.body.conteny_type,
			content : req.body.content,
			created_by : req.body.created_by,
			created_by_alias : req.body.created_by_alias,
			publish_up : req.body.publish_up,
			media : req.body.media,
			params : req.body.params,
			access : req.body.access,
			extra_info : req.body.extra_info,
			version : req.body.version
		});  
		content.save().then(result => 
		{
			console.log(result);
			res.status(201).json({ message: "Content created" });
		}).catch(err => 
		{
			console.log(err);
			res.status(500).json({ error: err });
		});
	}
}

module.exports.update = (req, res, next) =>
{
	const id = req.params.id;
	if( req.body.title == "" )
	{
		return res.status(401).json({   message: "title is empty"});
	}
	else if( req.body.category == "" )
	{
		return res.status(401).json({   message: "category is empty"});
	}
	else if( req.body.conteny_type == "" )
	{
		return res.status(401).json({   message: "conteny_type is empty"});
	}
	else
	{	
		const updateOps = {};
		let output = Object.entries(req.body).map(([key, value]) => ({key,value}));
		for (const ops of output) 
		{
			updateOps[ops.key] = ops.value;
		}
		Content.update({ _id: id }, { $set: updateOps })
	    .exec()
	    .then(result => 
	    {
	    	res.status(200).json(
			{
				message: "Content updated"
			});
	    })
	    .catch(err => 
	    {
			console.log(err);
			res.status(500).json(
			{
				error: err
			});
	    });
	}
}

module.exports.delete = (req, res, next) =>
{
	Content.remove({ _id: req.params.id })
    .exec()
    .then(result => 
    {
    		res.status(200).json({ message: "Content deleted"});
    }).catch(err => 
    {
      console.log(err);
      res.status(500).json({ error: err});
    });
}
module.exports.view_content = (req, res, next) =>
{
	Content.find({ _id: req.params.id })
    .exec()
    .then(content => 
    {
    	if (content) 
		{
			res.status(200).json(content);
		} 
		else 
		{
			res.status(404).json({ message: "No valid entry found for provided ID" });
		}
    	
    }).catch(err => 
    {
        console.log(err);
        res.status(500).json({ error: err});
    });	
}
module.exports.search_n_list = (req, res, next) =>
{
	let searchQueryOps = req.body;
	if (!parseInt(req.query.limit)) 
	{
		  req.query.limit = 10;
	}
	if (!parseInt(req.query.skip)) 
	{
		  req.query.skip = 0;
	}
	Content.find( searchQueryOps, null, {limit:parseInt(req.params.limit), skip:parseInt(req.params.skip)} )
    .exec()
    .then(result => 
    {
		console.log(result.length);
		if(result.length > 0)
		{
    		res.status(200).json(
			{
				content: result
			});
		}
		else
		{
			res.status(401).json({ message: "Empty record array" });
		}
    })
    .catch(err => 
    {
		console.log(err);
		res.status(500).json(
		{
			error: err
		});
    });
}
