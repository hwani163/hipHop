'use strict';

/**
 * @ngdoc function
 * @name myToDoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myToDoApp
 */
angular.module('myToDoApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
$.ajax({
  url:'/list',
  type:'post',
  success:function(data){
    $('#contents').text(data);
  }
});
