/**
 * Created by wanglei on 2016/11/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(JSON.stringify(req.session));
  res.render('index', {
    title: 'JavaScript',
    userinfo: req.session.userinfo
  });
});

module.exports = router;