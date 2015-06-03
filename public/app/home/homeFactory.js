'use strict';



angular.module('home')
  

  .factory('Credentials', ['auth','store','$location','Users', function(auth,store,$location,Users){

    var login = function(callback) {
  
      // alert("me");
      auth.signin({}, function(profile, token) {
        // Success callback
        

        var user = profile;

        user.role = "regular";
        Users.upsert({ user_id : user.user_id },user,function(dat){
          console.log("USER HAS BEEN SAVED",user,dat);

          profile._id = dat._id;
          profile.location = dat.location;
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/');
          if (typeof(callback) == "function") {
            callback();
          }
        })

        // console.log("USER INFO",profile);

      }, function(err) {
        // Error callback

        console.log("error",err);
      });
    }

    var logout = function(callback) {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      if (typeof(callback) == "function") {
        callback();
      }
      console.log("GO OUT");
      window.location = '/';
    }

    return {
      'login':  login,
      'logout' :  logout
    };
  }])
  ;





