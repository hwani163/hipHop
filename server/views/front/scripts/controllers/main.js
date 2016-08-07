"use strict";

$.ajax({
  url:'/list',
  type:'post',
  success:function(data){
    $('#mainList').empty();
    var keyArray = new Array();
    for (var moum in data.map){
      keyArray.push(moum);
    }
    //console.log(keyArray);
    for(var i=0; i< keyArray.length; i++){
      var key = keyArray[i];
      $('#mainList').append(
          '<div class="alert alert-info" role="alert" id="moumList'+i+'">'+
          '<span class="moum" onclick="wordDetail(this)">'+key+'</span></div>');



      for (var j=0; j<data.map[keyArray[i]].length; j++){
        $('#moumList'+i).append('<span class="word" onclick="wordDetail(this)">'+data.map[keyArray[i]][j]+'</span></div>');
      }
    }
  }
});


var wordDetail = function(span){
  $('#mainContents').load('views/detail.html');
  var detailKeyword = ($(span).html());
  var detailClass = $(span).attr("class");

  if(removeMode){
    alert('삭제하시겠습니가?');
    $.ajax({
      url:'/remove',
      type:'post',
      data : {'class' : detailClass,
              'value' : detailKeyword},
      success:function(response){
        alert(response.success+'개의 단어가 삭제 되었습니다.');
        $('#mainContents').load('views/main.html');

      }
    });
  }else{
    alert('상세정보 보시겠습니까');
    $.ajax({
      url:'/detail',
      type:'post',
      data : {'class' : detailClass,
              'value' : detailKeyword},
      success:function(data){
        console.log(detailKeyword);
        console.log(detailClass);
        $('#detailWord').empty();
        for(var i=0; i<data.length; i++){
          var word = '<li class="list-group-item">'+data[i].word
                        +'<span class="badge">'+data[i].create_date+'</span>' +
                     '</li>';
          $("#detailMoum").text(data[i].moum);
          $('#detailWord').append(word);
          console.log();
        }


      }
    });
  }

};












