'use strict';



angular.module('home')
  

  .factory('Credentials', ['auth','store','$location','Users', function(auth,store,$location,Users){

    var login = function() {
  
      // alert("me");
      auth.signin({}, function(profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');

        var user = profile;

        user.role = "regular";
        Users.upsert({ user_id : user.user_id },user,function(){
          console.log("USER HAS BEEN SAVED",user);
        })

        // console.log("USER INFO",profile);


      }, function(err) {
        // Error callback

        console.log("error",err);
      });
    }

    var logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      console.log("GO OUT");
      window.location = '/';
    }

    return {
      'login':  login,
      'logout' :  logout
    };
  }])
  ;





