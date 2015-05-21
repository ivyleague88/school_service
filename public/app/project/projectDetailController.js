'use strict';

angular.module('project')
  .controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Projects', '$location', function ($scope, $routeParams, Projects, $location) {
    $scope.project = Projects.get({id: $routeParams.id });

    $scope.update = function(){
      Projects.update({id: $scope.project._id}, $scope.project, function(){
        $location.url('/');
      });
    };

    $scope.remove = function(){
      Projects.remove({id: $scope.project._id}, function(){
        $location.url('/');
      });
    };
  }]);
