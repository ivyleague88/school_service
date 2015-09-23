'use strict';

angular.module('project')
    .controller('ProjectCategoryController', ['$scope', 'Projects', '$location', '$routeParams', 'Credentials', 'Analytics',
        function($scope, Projects, $location, $routeParams, Credentials, Analytics) {




            // console.log($routeParams);

            $scope.auth = Credentials.auth();
            if ($scope.auth.profile.email === ADMIN_EMAIL) {
                $scope.isAdmin = true;
                $scope.projects = Projects.query({
                    category: $routeParams.category
                });
            } else {
                $scope.isAdmin = false;
                $scope.projects = Projects.query({
                    category: $routeParams.category,
                    country: $scope.auth.profile.country
                });
            }


            $scope.title = "Category: " + $routeParams.category;

            Analytics.visitor({
                user_id: $scope.auth.profile._id,
                role: $scope.auth.profile.role,
                job_role: $scope.auth.profile.job_role,
                country: $scope.auth.profile.country
            }, function(ret) {
                console.log('visitor', ret);
            });

        }
    ]);