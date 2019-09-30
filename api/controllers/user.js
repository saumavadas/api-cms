const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_hello = (req, res, next) =>
{
	User.find({ email: req.body.email }).exec()
	res.status(200).json(
	{
        message: "Hello User"
    });	
}

exports.user_signup = (req, res, next) => 
{
	User.find({ email: req.body.email })
    .exec()
    .then(user => 
    {
    		if (user.length >= 1) 
    		{
    			return res.status(409).json(
    			{
    				message: "Mail exists"
    			});
    		} 
    		else 
    		{
    			bcrypt.hash(req.body.password, 10, (err, hash) => 
    			{
    				if (err) 
    				{
    					return res.status(500).json({ error: err });
    				} 
    				else 
    				{
    					const user = new User(
    					{
    						_id: new mongoose.Types.ObjectId(),
    						name:req.body.name,
    						user_name:req.body.user_name,
    						email: req.body.email,
    						params:req.body.params,
    						access:req.body.access,
    						contact_info:req.body.contact_info,
    						password: hash
    					});
    					user.save().then(result => 
    					{
    						console.log(result);
    						res.status(201).json({ message: "User created" });
    					}).catch(err => 
    					{
    						console.log(err);
    						res.status(500).json({ error: err });
    					});
    				}
    			});
    		}
    });
};

exports.user_login = (req, res, next) => 
{
	User.find({ email: req.body.email })
    .exec()
    .then(user => 
	{
    		//console.log(user)
		if (user.length < 1) 
		{
			return res.status(401).json({   message: "Auth failed 1"});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => 
		{
			if (err) 
			{
				return res.status(401).json({ message: "Auth failed 2"  });
			}
			//console.log(result)
	        if (result) 
	        {
	        		const token = jwt.sign(
	            {
	            		email: user[0].email,
	            		userId: user[0]._id
	            },
	            process.env.JWT_KEY,
	            { expiresIn: '1h' },
	            (err, token) => 
	            {
	            		return res.status(200).json({ message: "Auth successful", token: token });
	            });
	         }
	        else
	        	{
	        		res.status(401).json({ message: "Auth failed 3" });
	        	}  
		});
	}).catch(err => 
	{
		console.log(err);
		res.status(500).json({ error: err });
    });
};

exports.user_delete = (req, res, next) => 
{
	User.remove({ _id: req.params.userId })
    .exec()
    .then(result => 
    {
    		res.status(200).json({ message: "User deleted"});
    }).catch(err => 
    {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.user_search_list = (req, res, next) =>
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
	User.find( searchQueryOps, null, {limit:parseInt(req.params.limit), skip:parseInt(req.params.skip)} )
    .exec()
    .then(result => 
    {
    		console.log(result.length);
    		if(result.length > 0)
		{
    			res.status(200).json(
			{
				user: result
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
};

exports.view_user = (req, res, next) =>
{
	User.find({ _id: req.params.userId })
    .exec()
    .then(user => 
    {
    		if (user) 
		{
			res.status(200).json(user);
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
};

exports.user_edit = (req, res, next) =>
{
	const id = req.params.userId;
	const updateOps = {};
	let output = Object.entries(req.body).map(([key, value]) => ({key,value}));
	for (const ops of output) 
	{
		updateOps[ops.key] = ops.value;
	}
	User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => 
    {
    	res.status(200).json(
		{
			message: "User info updated"
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
};