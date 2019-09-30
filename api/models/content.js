const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
{
    _id: mongoose.Schema.Types.ObjectId,
    title:{ type: String, required: true },
	alias:{ type: String }
    category:{ type: String, required: true },
    content:[],
    created:{type: Date,default: Date.now},
    created_by:{type: Number, required: true},
	created_by_alias:{ type: String },
	modified:{type: Date},
	modified_by:{type: Number, required: true},,
	publish_up:{type: Date},
	publish_down:{type: Date},
	media:[],
    params:[],
    access:[],
    extra_info:[]
});

module.exports = mongoose.model('User', userSchema);