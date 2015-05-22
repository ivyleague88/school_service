'use strict';

angular.module('project')
  .controller('UserController', ['$scope', 'Projects','$location','$routeParams','auth','Credentials', function ($scope, Projects,$location,$routeParams,auth,Credentials) {


    $scope.auth = auth;

    if (!auth.isAuthenticated) {
      Credentials.login();
      return;
    }

    





  }])

;
