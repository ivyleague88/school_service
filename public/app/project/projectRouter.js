'use strict';

angular.module('project')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/project/projects.html',
        controller: 'ProjectController'
      })

      .when('/edit/:id', {
        templateUrl: '/app/project/projects.html',
        controller: 'ProjectController'
      })

      .when('/:id', {
        templateUrl: '/app/project/projectDetail.html',
        controller: 'ProjectDetailCtrl'
     });
  }]);
