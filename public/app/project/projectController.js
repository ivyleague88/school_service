'use strict';

angular.module('project')
  .controller('ProjectController', ['$scope', 'Projects','$location','$routeParams','auth','Credentials', function ($scope, Projects,$location,$routeParams,auth,Credentials) {


    $scope.auth = auth;

    if (!auth.isAuthenticated) {
      Credentials.login();
      return;
    }

    console.log(auth.profile);

    $scope.editing = [];

    $scope.project = {};

    $scope.defaultCategories = [ 'Business', 'Operations', 'IT', 'Security' ];
    $scope.project.category = 'Business';

    $scope.defaultEffortRequired = [ 'Hour(s)', 'Day(s)' ];
    $scope.project.effortRequired = 'Day(s)';
    $scope.effortNum = "1";

    $scope.defaultStatuses = ['Open','In Progress','Completed','Closed'];

    $scope.project.chargeable = false;

    $scope.isNewProject = true;


    $scope.DATE_FORMAT = "DD-MM-YYYY";

    new Pikaday({ 
      field: document.getElementById('project-posted-end-date-1') ,
      format  : $scope.DATE_FORMAT
    });

    new Pikaday({ 
      field: document.getElementById('project-start-date-1') ,
      format  : $scope.DATE_FORMAT
    });

    new Pikaday({ 
      field: document.getElementById('project-end-date-1') ,
      format  : $scope.DATE_FORMAT
    });



    if ($routeParams.id != undefined) {
      var project = Projects.get({id: $routeParams.id }, function(){

        if ($scope.auth.profile.user_id == project.user.user_id){
          $scope.isOwner = true;
        } else {
          $scope.isOwner = false;


          
        }

        if ($scope.auth.profile.email == ADMIN_EMAIL){
          $scope.isOwner = true;
        }

        if ($scope.isOwner == false){
          alert("You do not have authorization to edit this project");
          // swal("Unauthorized Access!","You do not have authorization to edit this project","error");
          window.location = '/';
        }


        project.postedEndDate = moment(new Date(project.postedEndDate)).format($scope.DATE_FORMAT);
        project.startDate = moment(new Date(project.startDate)).format($scope.DATE_FORMAT);
        project.endDate = moment(new Date(project.endDate)).format($scope.DATE_FORMAT);


        if (!project.visibility) {
          project.visibility = "global";
        }


        var effort = project.effortRequired.split(" ");
        project.effortRequired = effort[1];
        $scope.effortNum = effort[0];

        console.log("EDITTED PROJECT",project);

        $scope.project = project;
        $scope.isNewProject = false;





      });
      
      
    }

    // $scope.save = function(){
    //   if(!$scope.newProjectVal || $scope.newProjectVal.length < 1) return;
    //   var project = new Projects({ name: $scope.newProjectVal, completed: false });

    //   project.$save(function(){
    //     $scope.projects.push(project);
    //     $scope.newProjectVal = ''; // clear textbox
    //   });
    // };

    $scope.update = function(index){
      var project = $scope.projects[index];
      Projects.update({id: project._id}, project);
      $scope.editing[index] = false;
    };

    $scope.edit = function(index){
      $scope.editing[index] = angular.copy($scope.projects[index]);
    };

    $scope.cancel = function(index){
      $scope.projects[index] = angular.copy($scope.editing[index]);
      $scope.editing[index] = false;
    };

    $scope.remove = function(index){
      var project = $scope.projects[index];
      Projects.remove({id: project._id}, function(){
        $scope.projects.splice(index, 1);
      });
    };

    $scope.save = function(){
      var newProject = angular.copy($scope.project);

      if (newProject.skillset.constructor !== Array){
        newProject.skillset = newProject.skillset.split(',');
      }

      // check if the field is a number
      if ($scope.effortNum.match(/^[0-9]+$/) === null) {
        swal("Error!","The field should be a number","error");
        return;

      }

      newProject.effortRequired = $scope.effortNum + " " + newProject.effortRequired;
      

      var now = new Date();
      now.setHours(0,0,0,0);


      console.log("newProject.postedEndDate",newProject.postedEndDate);

      newProject.postedEndDate = moment(newProject.postedEndDate,$scope.DATE_FORMAT).toDate();
      newProject.startDate = moment(newProject.startDate,$scope.DATE_FORMAT).toDate();
      newProject.endDate = moment(newProject.endDate,$scope.DATE_FORMAT).toDate();

      // return;


      // only check if it is new project
      if ($scope.isNewProject === true) {
        if (newProject.postedEndDate.getTime() < now.getTime()) {
          swal("Invalid Date!","Project Posted End Date has to be greater than today","error");
          return;
        }
  
        if (newProject.startDate.getTime() < newProject.postedEndDate.getTime()) {
          swal("Invalid Date!","Start Date has to be after Project Posted End Date","error");
          return;
        }
  
        if (newProject.endDate.getTime() < newProject.startDate.getTime()) {
          swal("Invalid Date!","End Date has to be after Start Date","error");
          return;
        }
      } else {

        // if we are editing project
        if (newProject.startDate.getTime() < newProject.postedEndDate.getTime()) {
          swal("Invalid Date!","Start Date has to be after Project Posted End Date","error");
          return;
        }
  
        if (newProject.endDate.getTime() < newProject.startDate.getTime()) {
          swal("Invalid Date!","End Date has to be after Start Date","error");
          return;
        }
      }

      

      console.log(newProject);


      newProject.user = {
        user_id : auth.profile.user_id,
        name  : auth.profile.name,
      };

      var project = new Projects(newProject);
      if ($scope.isNewProject === true) {

        newProject.status = 'Open';
        project.$save(function(){
          console.log("PROJECT HAS BEEN CREATED",project);
          $location.url("/"+project._id);
        });
      } else {
        Projects.update({id: project._id}, project);
        console.log("PROJECT HAS BEEN UPDATED",project);
        $location.url("/"+project._id);
      }

      


      
    };





  }])

  .controller('HeaderController', ['$scope', 'Projects','$location','$routeParams','auth','Credentials', function ($scope, Projects,$location,$routeParams,auth,Credentials) {

    console.log('HEADER',auth);

    $scope.auth = auth;

    $scope.isAdmin = false;

    $scope.$watch('auth.profile',function(){
      if (($scope.auth.profile) && ($scope.auth.profile.email == ADMIN_EMAIL)){
          $scope.isAdmin = true;
      }
    })

    

    $scope.login  = Credentials.login;
    $scope.logout = Credentials.logout;

    
    $scope.search = function(){
      window.location = "/search/#/?q="+ $scope.query ;
    }



  }])
;
