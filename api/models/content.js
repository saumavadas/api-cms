const mongoose = require('mongoose');

const contentSchema = mongoose.Schema(
{
    _id: mongoose.Schema.Types.ObjectId,
    title:{ type: String, required: true },
	alias:{ type: String },
    category:{ type: String, required: true },
    conteny_type:{ type: String, required: true }, // product, article, banner etc. type 
    content:[], //introText, fullText and other
    created:{type: Date, default: Date.now},
    created_by:{type: String, required: true},
	created_by_alias:{ type: String },
	modified:{type: Date},
	modified_by:{type: Number},
	publish_up:{type: Date},
	publish_down:{type: Date},
	media:[],
    params:[],
    access:[],
    extra_info:[],
	version:{type: Number}
});

module.exports = mongoose.model('Content', contentSchema);
//added by Saumava