'use strict';

angular.module('project')
    .controller('ProfileController', ['$scope', 'Users', '$location', '$routeParams', 'Credentials', 'Projects', 'Analytics',
        function($scope, Users, $location, $routeParams, Credentials, Projects, Analytics) {


            $scope.auth = Credentials.auth();

            if (!$scope.auth.isAuthenticated) {
                Credentials.login();
                return;
            }

            $scope.userId = $scope.auth.profile.user_id;


            var user = Users.getByUserId({
                user_id: $scope.userId
            }, function() {

                // set default value
                if (!user.skills) {
                    user.skills = [];
                }
                if (!user.interests) {
                    user.interests = [];
                }

                $scope.user = user;
            })

            var projects = Projects.getByUserId({
                user_id: $scope.userId
            }, function() {
                // console.log("USER PROJECT",projects);

                $scope.projects = projects;
            });


            var completedProjects = Projects.getCompletedProjectsByUserId({
                user_id: $scope.userId
            }, function() {
                // console.log("USER PROJECT",projects);

                $scope.completedProjects = completedProjects;
            });

            $scope.invitedProjects = Projects.invited({
                id: $scope.userId
            });



            $scope.editProfile = function() {
                $location.path("/edit");
            }

            Analytics.visitor({
                user_id: $scope.auth.profile._id,
                role: $scope.auth.profile.role,
                job_role: $scope.auth.profile.job_role,
                country: $scope.auth.profile.country
            }, function(ret) {
                console.log('visitor', ret);
            });





        }
    ])

;