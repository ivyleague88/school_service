'use strict';



angular.module('home')
  .controller('HomeController', function (auth,$scope, store, $location,Users,Credentials) {

    $scope.auth = auth;

    console.log("AUTH VARIABLE HERE",$scope.auth);

    $scope.login = function(){
      Credentials.login();
    }

    $scope.logout = function(){
      Credentials.logout();
    }
    
  
});
