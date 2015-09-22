'use strict';

angular.module('project')
    .controller('SearchController', ['$scope', 'Users', '$location', '$routeParams', 'auth', 'Credentials', 'Projects', 'Analytics',
        function($scope, Users, $location, $routeParams, auth, Credentials, Projects, Analytics) {


            // for analytics
            // check for authentication
            $scope.auth = Credentials.auth();
            if (!$scope.auth.isAuthenticated) {
                Credentials.login();
                return;
            }

            var projects = Projects.search({
                q: $routeParams.q,
                country: Credentials.auth().profile.country
            }, function() {
                console.log("PROJECTS", projects);
                $scope.projects = projects;

                // for tracking searched projects
                var pStats = {};
                for (var i = 0; i < projects.length; i++) {
                    var cat = projects[i].category;
                    if (!pStats[cat]) {
                        pStats[cat] = 1;
                    } else {
                        pStats[cat] += 1;
                    }
                };
                Analytics.searchedProject({
                    keyword: $routeParams.q,
                    user_id: $scope.auth.profile._id,
                    dat: pStats,
                    country: $scope.auth.profile.country
                }, function(ret) {
                    console.log('searched projects', ret);
                })
            });




            // for tracking searched keywords
            Analytics.keyword({
                name: $routeParams.q,
                user_id: $scope.auth.profile._id,
                role: $scope.auth.profile.role,
                job_role: $scope.auth.profile.job_role,
                country: $scope.auth.profile.country
            }, function(ret) {
                console.log('analytics', ret);
            })



        }
    ])

;