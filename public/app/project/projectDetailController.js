'use strict';

angular.module('project')
  .controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Projects', '$location','Questions','auth','Credentials', function ($scope, $routeParams, Projects, $location, Questions,auth,Credentials) {
    
    $scope.auth = auth;

    $scope.isAdmin = false;


    $scope.project = Projects.get({id: $routeParams.id },function(){
        if ($scope.auth.profile.user_id == $scope.project.user.user_id){
          $scope.isOwner = true;
        } else {
          $scope.isOwner = false;
        }


        if ($scope.auth.profile.email == ADMIN_EMAIL){
          $scope.isOwner = true;
          $scope.isAdmin = true;
        }
    });

    $scope.questions = Questions.query({project_id: $routeParams.id },function(){

      console.log($scope.questions,"MY QUESTION");
    });

   

    $scope.showQuestion = true;

    $scope.showAsk = false;

    $scope.update = function(){
      Projects.update({id: $scope.project._id}, $scope.project, function(){
        $location.url('/');
      });
    };

    $scope.delete = function(){
      Projects.remove({id: $scope.project._id}, function(){
        alert("Project has been removed");
        $location.url('/');
      });
    };

    $scope.ask = function(){
      $scope.showAsk  = true;
    };


    $scope.submitQuestion = function(){


      var newQuestion = {
        content : $scope.question,
        project_id : $scope.project._id,
        user : {
          name : $scope.auth.profile.name,
          user_id : $scope.auth.profile.user_id
        }
      };
      var question = new Questions(newQuestion);
      question.$save(function(){
          console.log("question HAS BEEN CREATED",question);
          $scope.questions.unshift(question);
          $scope.question = "";
        });
      console.log($scope.question);
    };


    $scope.showQuestions = function(){
      $scope.showQuestion = true;
    }



  }]);
