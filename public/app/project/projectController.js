'use strict';

angular.module('project')
  .controller('ProjectController', ['$scope', 'Projects','$location','$routeParams','auth','Credentials', function ($scope, Projects,$location,$routeParams,auth,Credentials) {


    $scope.auth = auth;

    if (!auth.isAuthenticated) {
      Credentials.login();
      return;
    }

    console.log(auth.profile);

    $scope.editing = [];

    $scope.project = {};

    $scope.defaultCategories = [ 'Business', 'Operations', 'IT', 'Security' ];
    $scope.project.category = 'Business';

    $scope.defaultEffortRequired = [ '1 Hour', '1 Day' ];
    $scope.project.effortRequired = '1 Hour';

    $scope.defaultStatuses = ['Open','In Progress','Completed','Closed'];

    $scope.project.chargeable = false;

    $scope.isNewProject = true;


    if ($routeParams.id != undefined) {
      var project = Projects.get({id: $routeParams.id }, function(){

        if ($scope.auth.profile.user_id == project.user.user_id){
          $scope.isOwner = true;
        } else {
          $scope.isOwner = false;


          
        }

        if ($scope.auth.profile.email == ADMIN_EMAIL){
          $scope.isOwner = true;
        }

        if ($scope.isOwner == false){
          alert("You do not have authorization to edit this project");
          window.location = '/';
        }


        project.postedEndDate = new Date(project.postedEndDate);
        project.startDate = new Date(project.startDate);
        project.endDate = new Date(project.endDate);
        $scope.project = project;
        $scope.isNewProject = false;



      });
      
      
    }

    // $scope.save = function(){
    //   if(!$scope.newProjectVal || $scope.newProjectVal.length < 1) return;
    //   var project = new Projects({ name: $scope.newProjectVal, completed: false });

    //   project.$save(function(){
    //     $scope.projects.push(project);
    //     $scope.newProjectVal = ''; // clear textbox
    //   });
    // };

    $scope.update = function(index){
      var project = $scope.projects[index];
      Projects.update({id: project._id}, project);
      $scope.editing[index] = false;
    };

    $scope.edit = function(index){
      $scope.editing[index] = angular.copy($scope.projects[index]);
    };

    $scope.cancel = function(index){
      $scope.projects[index] = angular.copy($scope.editing[index]);
      $scope.editing[index] = false;
    };

    $scope.remove = function(index){
      var project = $scope.projects[index];
      Projects.remove({id: project._id}, function(){
        $scope.projects.splice(index, 1);
      });
    };

    $scope.save = function(){
      var newProject = angular.copy($scope.project);

      if (newProject.skillset.constructor !== Array){
        newProject.skillset = newProject.skillset.split(',');
      }

      

      var now = new Date();
      now.setHours(0,0,0,0);

      if (newProject.postedEndDate.getTime() < now.getTime()) {
        alert("Project Posted End Date has to be greater than today");
        return;
      }

      if (newProject.startDate.getTime() < newProject.postedEndDate.getTime()) {
        alert("Start Date has to be after Project Posted End Date ");
        return;
      }

      if (newProject.endDate.getTime() < newProject.startDate.getTime()) {
        alert("End Date has to be after Start Date ");
        return;
      }

      console.log(newProject);


      newProject.user = {
        user_id : auth.profile.user_id,
        name  : auth.profile.name,
      };

      var project = new Projects(newProject);
      if ($scope.isNewProject === true) {

        newProject.status = 'Open';
        project.$save(function(){
          console.log("PROJECT HAS BEEN CREATED",project);
          $location.url("/"+project._id);
        });
      } else {
        Projects.update({id: project._id}, project);
        console.log("PROJECT HAS BEEN UPDATED",project);
        $location.url("/"+project._id);
      }

      


      
    };





  }])

  .controller('HeaderController', ['$scope', 'Projects','$location','$routeParams','auth','Credentials', function ($scope, Projects,$location,$routeParams,auth,Credentials) {

    console.log('HEADER',auth);

    $scope.auth = auth;

    $scope.isAdmin = false;

    $scope.$watch('auth.profile',function(){
      if (($scope.auth.profile) && ($scope.auth.profile.email == ADMIN_EMAIL)){
          $scope.isAdmin = true;
      }
    })

    

    $scope.login  = Credentials.login;
    $scope.logout = Credentials.logout;

    
    $scope.search = function(){
      window.location = "/search/#/?q="+ $scope.query ;
    }



  }])
;
