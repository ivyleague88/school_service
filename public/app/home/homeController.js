'use strict';



angular.module('home')
  .controller('HomeController', function (auth,$scope, store, $location,Users,Credentials,Projects) {

    $scope.auth = auth;

    console.log("AUTH VARIABLE HERE",$scope.auth);

    $scope.login = function(){
      Credentials.login();
    }

    $scope.logout = function(){
      Credentials.logout();
    }

    $scope.featuredProjects = Projects.featured();
    
  	$scope.featuredUsers= Users.featured();

  	$scope.projectOwnerSelected = false;
  	$scope.projectSeekerSelected = false;
  	$scope.selectProjectSeeker = function(){
  		
  		if ($scope.projectSeekerSelected == true) {
  			$scope.projectSeekerSelected = false;
  		} else {
  			$scope.projectOwnerSelected = false;
  			$scope.projectSeekerSelected = true;
  		}
  		
  	}

  	$scope.selectProjectOwner = function(){

  		if ($scope.projectOwnerSelected == true) {
  			$scope.projectOwnerSelected = false;
  		} else {
  			$scope.projectOwnerSelected = true;
  			$scope.projectSeekerSelected = false;
  		}
  		
  	}

  	$scope.search = function(){
      window.location = "/search/#/?q="+ $scope.query ;
    }

});
