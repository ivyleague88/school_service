'use strict';

angular.module('project')
  .controller('SearchController', ['$scope', 'Users','$location','$routeParams','auth','Credentials','Projects', function ($scope, Users,$location,$routeParams,auth,Credentials,Projects) {


    console.log("QUERY",$routeParams);


    var projects = Projects.search({q : $routeParams.q},function(){
      console.log("PROJECTS",projects);
      $scope.projects = projects;
    }) 

    // $scope.projects = [
    //     {
    //       title  : "Project 1",
    //       description : "Desc me",
    //       user : {
    //         name : "this is my name"
    //       }
    //     },
    //     {
    //       title  : "Project 2",
    //       description : "Desc me 2",
    //       user : {
    //         name : "this is my name 2"
    //       }
    //     },
    //     {
    //       title  : "Project 3",
    //       description : "Desc me 3",
    //       user : {
    //         name : "this is my name 3"
    //       }
    //     }

    // ];


  }])

;
