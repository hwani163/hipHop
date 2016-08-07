/**
 * Created by Seokhwan on 2016. 7. 31..
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


router.post('/', function(req, res, next) {
    var words = [req.body.moum,req.body.word];
    console.log(words);
    var query = pool.query('insert into RHYME_LIST (user_id,moum,word,create_date,status) values("hwani163",?,?,now(),true)',words,function(err){
        if (err) {
            console.error(err);
            throw err;
        }
    });
    pool.release();
});

module.exports = router;
