'use strict';



angular.module('home')
  .controller('HomeController', function ($scope, auth, store, $location) {
    $scope.login = function() {
  
      // alert("me");
      auth.signin({}, function(profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');
      }, function() {
        // Error callback
      });
    }
  
    $scope.name = 'hello';
});
