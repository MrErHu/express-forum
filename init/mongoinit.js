/**
 * Created by mr_wang on 2016/11/16.
 */

var mongoose = require('mongoose');
var DBINFO = require("../static/DBINFO");

mongoose.connect(DBINFO.ConnectURL, {user: DBINFO.user, pass: DBINFO.pwd},
    function (err) {
        if(err){
            console.log(JSON.stringify(err));
            console.log('DB init fail.....');
            process.exit(-1);
        }
    });
console.log('DB init sussess......');