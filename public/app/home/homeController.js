'use strict';



angular.module('home')
  .controller('HomeController', function (auth,$scope, store, $location) {

    $scope.auth = auth;
    $scope.login = function() {
  
      // alert("me");
      auth.signin({}, function(profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');

        console.log("USER INFO",profile);
      }, function(err) {
        // Error callback

        console.log("error",err);
      });
    }

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    }
  
});
