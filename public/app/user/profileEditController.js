'use strict';

angular.module('project')
    .controller('ProfileEditController', ['$scope', 'Users', '$location', '$routeParams', 'auth', 'Credentials', 'Projects', 'SweetAlert',
        function($scope, Users, $location, $routeParams, auth, Credentials, Projects, SweetAlert) {

            $scope.auth = auth;

            if (!auth.isAuthenticated) {
                Credentials.login();
                return;
            }

            $scope.userId = auth.profile.user_id;


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

                $scope.skills = user.skills.join(',');
                $scope.interests = user.interests.join(',');
                $scope.user = user;
            })


            $scope.save = function() {
                user.skills = $scope.skills.split(",");
                user.interests = $scope.interests.split(",");
                console.log(user);

                Users.update({
                    id: user._id
                }, user);
                console.log("USER HAS BEEN UPDATED", user);
                // alert("The user has been saved!");
                SweetAlert.swal("Saved!", "The user's profile has been updated.", "success");
            }


            $scope.goToProfile = function() {
                $location.path("/");
            }
        }
    ])

;