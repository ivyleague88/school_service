'use strict';


angular.module('home')
    .controller('HomeController', function(auth, $scope, store, $location, Users, Credentials, Projects, $interval) {

        $scope.auth = auth;

        console.log("AUTH VARIABLE HERE", $scope.auth);
        $scope.imgUrl = "";

        var animatedBG = function(location) {
            if (location != null) {
                $scope.imgUrl = "/app/assets/img/bg/" + location + "/1.jpg";
            } else {
                $scope.imgUrl = "";
            }


            var index = 2;
            var totalImage = 3;
            $interval(function() {
                $scope.imgUrl = "/app/assets/img/bg/" + location + "/" + index + ".jpg";

                index += 1;

                if (index > totalImage) {
                    index = 1;
                }
            }, 10000);
        }

        $scope.login = function() {
            Credentials.login(function() {
                var location = store.get("profile").location;

                if (location != null) {
                    $scope.imgUrl = "/app/assets/img/bg/" + location + "/1.jpg";
                } else {
                    $scope.imgUrl = "";
                }

                animatedBG(location);
            });
        }

        $scope.logout = function() {
            Credentials.logout(function() {
                $scope.location = null;
            });
        }

        if (auth.isAuthenticated) {
            var location = store.get("profile").location;
            animatedBG(location);


        }





        $scope.featuredProjects = Projects.featured();

        $scope.featuredUsers = Users.featured();

        $scope.projectOwnerSelected = false;
        $scope.projectSeekerSelected = false;
        $scope.selectProjectSeeker = function() {

            if ($scope.projectSeekerSelected == true) {
                $scope.projectSeekerSelected = false;
            } else {
                $scope.projectOwnerSelected = false;
                $scope.projectSeekerSelected = true;
            }

        }

        $scope.selectProjectOwner = function() {

            if ($scope.projectOwnerSelected == true) {
                $scope.projectOwnerSelected = false;
            } else {
                $scope.projectOwnerSelected = true;
                $scope.projectSeekerSelected = false;
            }

        }

        $scope.search = function() {
            window.location = "/search/#/?q=" + $scope.query;
        }

    });