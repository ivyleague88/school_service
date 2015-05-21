'use strict';

angular.module('project')
  .controller('ProjectController', ['$scope', 'Projects', function ($scope, Projects) {
    $scope.editing = [];
    $scope.projects = Projects.query();

    $scope.save = function(){
      if(!$scope.newProject || $scope.newProject.length < 1) return;
      var project = new Projects({ name: $scope.newProject, completed: false });

      project.$save(function(){
        $scope.projects.push(project);
        $scope.newProject = ''; // clear textbox
      });
    };

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
  }]);
