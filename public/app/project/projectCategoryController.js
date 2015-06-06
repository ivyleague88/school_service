'use strict';

angular.module('project')
    .controller('ProjectCategoryController', ['$scope', 'Projects', '$location', '$routeParams',
        function($scope, Projects, $location, $routeParams) {




            // console.log($routeParams);
            $scope.projects = Projects.query({
                category: $routeParams.category
            });


            $scope.title = "Category: " + $routeParams.category;

        }
    ]);