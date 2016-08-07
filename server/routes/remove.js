/**
 * Created by Seokhwan on 2016. 8. 6..
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'hwani163',
    database: 'hwani163',
    password: '1234qwer'
});

var DETAIL_QUERY = 'UPDATE RHYME_LIST SET STATUS=FALSE' +
    ' where user_id="hwani163"' +
    ' and status = true';

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log('remove...');
    console.log(req.body.class+'zz');
    console.log(req.body.value+'zz');
    var clazz = req.body.class;
    var keyword = req.body.value;

    pool.getConnection(function (err, connection) {
        // Use the connection
        var QUERY = queryParsing(clazz,keyword);
        console.log(QUERY);
        connection.query(QUERY, function (err, rows) {
            if(err){
                console.log(err);
            }else{
                console.log(rows.changedRows+'행이 UPDATE 되었습니다');
                res.send({'success':rows.changedRows});
            }
            connection.release();
        });
    });
});
var queryParsing = function(clazz,keyword){
    if(clazz == 'word'){
        return DETAIL_QUERY+' and word =\''+keyword+'\'';
    }else if(clazz =='moum'){
        return DETAIL_QUERY+' and moum =\''+keyword+'\'';
    }else{
        return DETAIL_QUERY+' and word =\''+keyword+'\'';
    }
};

module.exports = router;
