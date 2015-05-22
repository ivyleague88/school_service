'use strict';

angular.module('project')
  .controller('UserController', ['$scope', 'Users','$location','$routeParams','auth','Credentials','Projects', function ($scope, Users,$location,$routeParams,auth,Credentials,Projects) {


    $scope.auth = auth;

    if (!auth.isAuthenticated) {
      Credentials.login();
      return;
    }

    $scope.userId = auth.profile.user_id;


    var user = Users.getByUserId({user_id : $scope.userId},function(){

      user.skills = ["angularjs","golang"];
      user.interests = ["shopping","sleeping"];
      $scope.user = user;
    })

    var projects = Projects.getByUserId({user_id : $scope.userId},function(){
      // console.log("USER PROJECT",projects);

      $scope.projects = projects;
    });


    var completedProjects = Projects.getByUserId({user_id : $scope.userId},function(){
      // console.log("USER PROJECT",projects);

      $scope.completedProjects = completedProjects;
    });





  }])

;
