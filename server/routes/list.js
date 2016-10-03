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

var LIST_QUERY = 'SELECT moum,word'
                +' FROM RHYME_LIST'
                +' where user_id="hwani163"'
                +' and status = true';

HashMap = function(){
  this.map = new Object();
};
HashMap.prototype = {
  put : function(key, value){
    this.map[key] = value;
  },
  get : function(key){
    return this.map[key];
  },
  containsKey : function(key){
    return key in this.map;
  },
  containsValue : function(value){
    for(var prop in this.map){
      if(this.map[prop] == value) return true;
    }
    return false;
  },
  isEmpty : function(key){
    return (this.size() == 0);
  },
  clear : function(){
    for(var prop in this.map){
      delete this.map[prop];
    }
  },
  remove : function(key){
    delete this.map[key];
  },
  keys : function(){
    var keys = new Array();
    for(var prop in this.map){
      keys.push(prop);
    }
    return keys;
  },
  values : function(){
    var values = new Array();
    for(var prop in this.map){
      values.push(this.map[prop]);
    }
    return values;
  },
  size : function(){
    var count = 0;
    for (var prop in this.map) {
      count++;
    }
    return count;
  }
};





/* GET users listing. */
router.post('/', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(LIST_QUERY, function (err, rows) {
      var listMap = new HashMap();
      if (err) console.error("err : " + err);
      for(var i=0; i<rows.length; i++){
        if(listMap.get(rows[i].moum) == undefined){
          //언디파인드이면 배열을 새로 만들어서 집어 넣어야한다
          var valueArray = new Array();
          valueArray.push(rows[i].word);
          listMap.put(rows[i].moum ,valueArray);
        }else{
          //key 에 해당하는 배열이 존재한다는 의미이므로
          listMap.get(rows[i].moum).push(rows[i].word);
        }
      }

      res.send(listMap);

      //res.send(removeMODE);
      connection.release();
    });
  });
});

module.exports = router;
