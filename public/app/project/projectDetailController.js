'use strict';

angular.module('project')
  .controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Projects', '$location','Questions', function ($scope, $routeParams, Projects, $location, Questions) {
    $scope.project = Projects.get({id: $routeParams.id });

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

    $scope.remove = function(){
      Projects.remove({id: $scope.project._id}, function(){
        $location.url('/');
      });
    };

    $scope.ask = function(){
      $scope.showAsk  = true;
    };


    $scope.submitQuestion = function(){


      var newQuestion = {
        content : $scope.question,
        project_id : $scope.project._id
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
