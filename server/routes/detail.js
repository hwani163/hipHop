/**
 * Created by Seokhwan on 2016. 8. 6..
 */
var express = require('express');
var moment = require('moment');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'hwani163',
    database: 'hwani163',
    password: '1234qwer'
});

var DETAIL_QUERY = 'SELECT moum,word,create_date' +
                    ' FROM RHYME_LIST' +
                    ' where user_id="hwani163"' +
                    ' and status = true';

var SEARCH_QUERY = 'SELECT distinct moum,word,create_date' +
    ' FROM RHYME_LIST' +
    ' where user_id="hwani163"' +
    ' and status = true ';

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log('detail...');
    var clazz = req.body.class;
    var keyword = req.body.value;

    pool.getConnection(function (err, connection) {
        // Use the connection
        var QUERY = queryParsing(keyword,clazz);
        connection.query(QUERY, function (err, rows) {
            console.log(QUERY);
            console.log(rows);
            rows = dateParsing(rows);
            console.log(rows);
            res.send(rows);
            connection.release();
        });
    });
});

router.post('/search', function(req, res, next) {
    console.log('search...');

    var keyword = req.body.value;

    pool.getConnection(function (err, connection) {
        // Use the connection
        var QUERY = queryParsing(keyword);
        connection.query(QUERY, function (err, rows) {
            console.log(QUERY);
            console.log(rows);
            rows = dateParsing(rows);
            console.log(rows);
            res.send(rows);
            connection.release();
        });
    });
});

var queryParsing = function(keyword,clazz){
    if(clazz == 'word'){
        return DETAIL_QUERY+' and word =\''+keyword+'\' order by create_date desc';
    }else if(clazz =='moum'){
        return DETAIL_QUERY+' and moum =\''+keyword+'\' order by create_date desc';
    }else if(clazz ==undefined){
        return SEARCH_QUERY+'and word = "'+keyword+'" or moum = "'+keyword+'" order by create_date desc';
    }
};

var dateParsing = function(rows){
    for(var i=0; i<rows.length; i++){
        console.log(rows[i].create_date);
        console.log(moment(rows[i].create_date).format('YYYY[-]MM[-]DD'));
        var date = moment(rows[i].create_date).format('YYYY[-]MM[-]DD');
        rows[i].create_date = date;
    }
    return rows;
};

module.exports = router;
