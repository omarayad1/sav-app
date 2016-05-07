/**
 * ResultsController
 *
 * @description :: Server-side logic for managing results
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var redis = require('redis');
client = redis.createClient();

module.exports = {
	getResults: function(req,res){
		client.get(req.body.token, function(err, value){
			if (value===null) return res.json({err: "Not authenticated"});
			Results.findOne({taskId: req.body.id}).exec(function(err,found){
				if (err) res.json({err:err});
				else res.json(found);
			})
		});
	},
};
