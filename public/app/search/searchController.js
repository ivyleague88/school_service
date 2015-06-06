'use strict';

angular.module('project')
    .controller('SearchController', ['$scope', 'Users', '$location', '$routeParams', 'auth', 'Credentials', 'Projects',
        function($scope, Users, $location, $routeParams, auth, Credentials, Projects) {


            console.log("QUERY", $routeParams);


            var projects = Projects.search({
                q: $routeParams.q
            }, function() {
                console.log("PROJECTS", projects);
                $scope.projects = projects;
            })



        }
    ])

;