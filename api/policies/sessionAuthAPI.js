var redis = require('redis');
clientRedis = redis.createClient();

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  clientRedis.get(req.body.token, function(err, value){
    if (value != null) {
      return next();
    }
    return res.json({err: "Not authenticated"});
  })

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
