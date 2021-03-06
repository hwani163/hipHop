var removeMode = false;
$(document).ready(function() {
  $('#mainContents').load('htmls/main.html');
});

//Event handler
$('#addButton').click(function (){
  $('#realAddButton').trigger('click');
  $('#mainContents').load('htmls/main.html');
});

$('#removeButton').click(function (){
    if(removeMode ==false){
      removeMode = true;
      $('.moum').css("background-image","url(../images/remove.png)");
      $('.moum').css("background-position","left top");
      $('.moum').css("background-repeat", "no-repeat");
      $('.word').css("background-image","url(../images/remove.png)");
      $('.word').css("background-position","left top");
      $('.word').css("background-repeat", "no-repeat");

      $( ".moum" )
          .mouseenter(function() {
            $(this).css("background-color","#ec9898");
          })
          .mouseleave(function() {
            $(this).css("background-color","");
          });

      $( ".word" )
          .mouseenter(function() {
            $(this).css("background-color","#ec9898");
          })
          .mouseleave(function() {
            $(this).css("background-color","");
          });
    }else{
      removeMode = false;
      $('.moum').css("background-image","none");
      $('.moum').css("background-position","none");
      $('.moum').css("background-repeat", "none");
      $('.word').css("background-image","none");
      $('.word').css("background-position","left top");
      $('.word').css("background-repeat", "no-repeat");
      $( ".moum" )
          .mouseenter(function() {
            $(this).css("background-color","#ace2fd");
          })
          .mouseleave(function() {
            $(this).css("background-color","");
          });

      $( ".word" )
          .mouseenter(function() {
            $(this).css("background-color","#ace2fd");
          })
          .mouseleave(function() {
            $(this).css("background-color","");
          });
    }
});



$('#searchButton').click(function (){
  $('#realSearchButton').trigger('click');
  //$('#mainContents').load('views/detail.html');
});
$('#searchAjax').click(function(){
    $('#mainContents').load('htmls/detail.html');
    $.ajax({
        url:'/detail/search',
        type:'post',
        data : {'value' : $('#searchWord').val()},
        success:function(data){
            $('#searchModal').modal('hide');
            $('#detailWord').empty();
            for(var i=0; i<data.length; i++){
                var word = '<li class="list-group-item">'+data[i].word
                    +'<span class="badge">'+data[i].create_date+'</span>' +
                    '</li>';
                $("#detailMoum").text(data[i].moum);
                $('#detailWord').append(word);

            }



        }
    });
});

$('#settingButton').click(function (){
  $('#mainContents').load('views/setting.html');
});

$('#addToServerByAjax').click(function(){
  var word = $('#word').val();
  var collections = "";
  if(word=='' || word==null){
    alert('아무것도 입력하지 않으셨습니당');
    $('#addModal').modal('hide');
  }else{
    //alert(word+'라는 단어를 입력하셨습니다');
    collections = word.toKoreanChar();
    //alert(collections);
    $('#addModal').modal('hide');

    $.post("/add", { "moum": collections, "word" : word }, function(data){
          alert(data);

        }, "json");
    $('#mainContents').load('htmls/main.html');

  }
});





