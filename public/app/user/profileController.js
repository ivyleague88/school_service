'use strict';

angular.module('project')
  .controller('ProfileController', ['$scope', 'Users','$location','$routeParams','auth','Credentials','Projects', function ($scope, Users,$location,$routeParams,auth,Credentials,Projects) {


    $scope.auth = auth;

    if (!auth.isAuthenticated) {
      Credentials.login();
      return;
    }

    $scope.userId = auth.profile.user_id;


    var user = Users.getByUserId({user_id : $scope.userId},function(){

      // set default value
      if (!user.skills) {
        user.skills = [];
      }
      if (!user.interests){
        user.interests = [];
      }
      
      $scope.user = user;
    })

    var projects = Projects.getByUserId({user_id : $scope.userId},function(){
      // console.log("USER PROJECT",projects);

      $scope.projects = projects;
    });


    var completedProjects = Projects.getCompletedProjectsByUserId({user_id : $scope.userId},function(){
      // console.log("USER PROJECT",projects);

      $scope.completedProjects = completedProjects;
    });

    $scope.invitedProjects = Projects.invited({id : $scope.userId});



    $scope.editProfile  = function(){
      $location.path("/edit");
    }





  }])

;
