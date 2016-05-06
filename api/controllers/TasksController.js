/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mmm = require('mmmagic');
var redis = require('redis');
var amqp = require('amqplib/callback_api');

clientRedis = redis.createClient();

module.exports = {
	pushJob: function(req,res){
		req.file('data').upload({
				maxBytes: 1500000000
		}, function(err, uploaded){
			if (err) res.json({ err:err });
			else {
				Magic = mmm.Magic;
				var magic = new Magic(mmm.MAGIC_MIME_TYPE);
				magic.detectFile(uploaded[0].fd, function(err, filetype) {
					if (err) res.json({ err:err });
					else if (!((filetype.indexOf('image')+1)||(filetype.indexOf('video')+1))) res.json({err: "Not a Valid Image or video file"});
					else {
            var type = filetype.substring(0,5)
						Tasks.create({userId: value, file: uploaded[0].fd, type: type, status: "added to queue", name: req.body.name}).exec(function(err,created){
							if (err) res.json({err: err});
							else {
                amqp.connect('amqp://localhost', function(err, conn) {
                  conn.createChannel(function(err,ch){
                    if (type === 'image') var q = "classify";
                    else var q = "extract";
                    ch.assertQueue(q, {durable: false});
                    ch.sendToQueue(q, created.id);
                    res.json({'status': created.status, 'type': created.type, 'id': created.id});
                  });
                });
							}
						});
					}
				});
			}
		});
	}
};
