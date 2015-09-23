'use strict';

angular.module('project')
    .controller('ProfileEditController', ['$scope', 'Users', '$location', '$routeParams', 'auth', 'Credentials', 'Projects', 'SweetAlert', 'Analytics',
        function($scope, Users, $location, $routeParams, auth, Credentials, Projects, SweetAlert, Analytics) {

            $scope.auth = Credentials.auth();

            if (!$scope.auth.isAuthenticated) {
                Credentials.login();
                return;
            }

            $scope.userId = $scope.auth.profile.user_id;


            $scope.user = Users.getByUserId({
                user_id: $scope.userId
            }, function(user) {

                // set default value
                if (!user.skills) {
                    user.skills = [];
                }
                if (!user.interests) {
                    user.interests = [];
                }

                $scope.skills = user.skills.join(',');
                $scope.interests = user.interests.join(',');

            })

            $scope.change = function() {
                console.log("STATUS", $scope.user.status, $scope.user);
            }

            $scope.save = function() {

                // trim
                var skills = $scope.skills.split(",");
                for (var i = 0; i < skills.length; i++) {
                    skills[i] = skills[i].trim();
                };
                $scope.user.skills = skills;


                // trim interests
                var interests = $scope.interests.split(",");
                for (var i = 0; i < interests.length; i++) {
                    interests[i] = interests[i].trim();
                };
                $scope.user.interests = interests;


                Users.update({
                    id: $scope.user._id
                }, $scope.user, function(user) {
                    $scope.user = user;
                    console.log("USER HAS BEEN UPDATED", user);
                    // alert("The user has been saved!");
                    SweetAlert.swal("Saved!", "The user's profile has been updated.", "success");
                });

            }


            $scope.goToProfile = function() {
                $location.path("/");
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