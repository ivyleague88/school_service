'use strict';

angular.module('project')
  .controller('ProjectController', ['$scope', 'Projects','$location','$routeParams', function ($scope, Projects,$location,$routeParams) {
    $scope.editing = [];
    $scope.projects = Projects.query();

    $scope.project = {};

    $scope.defaultEffortRequired = [ '1 Hour', '1 Day' ];
    $scope.project.effortRequired = '1 Hour';

    $scope.project.chargeable = false;

    $scope.isNewProject = true;


    if ($routeParams.id != "") {
      var project = Projects.get({id: $routeParams.id }, function(){
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

      var project = new Projects(newProject);
      if ($scope.isNewProject === true) {
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



  }]);
