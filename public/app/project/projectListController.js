'use strict';

angular.module('project')
    .controller('ProjectListController', ['$scope', 'Projects', '$location', '$routeParams',
        function($scope, Projects, $location, $routeParams) {

            $scope.projects = Projects.query();




        }
    ]);