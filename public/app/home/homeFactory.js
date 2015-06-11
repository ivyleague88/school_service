'use strict';



angular.module('home')


.factory('Credentials', ['auth', 'store', '$location', 'Users', '$modal',
    function(auth, store, $location, Users, $modal) {

        // var login = function(callback) {

        //     // alert("me");
        //     auth.signin({}, function(profile, token) {
        //         // Success callback


        //         var user = profile;

        //         user.role = "regular";
        //         Users.upsert({
        //             user_id: user.user_id
        //         }, user, function(dat) {
        //             console.log("USER HAS BEEN SAVED", user, dat);

        //             profile._id = dat._id;
        //             profile.location = dat.location;
        //             store.set('profile', profile);
        //             store.set('token', token);
        //             $location.path('/');
        //             if (typeof(callback) == "function") {
        //                 callback();
        //             }
        //         })

        //         // console.log("USER INFO",profile);

        //     }, function(err) {
        //         // Error callback

        //         console.log("error", err);
        //     });
        // }


        var login = function(callback) {
            // login modal
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'loginModalContent.html',
                controller: 'loginModalCtrl',
                size: '',
                resolve: {
                    Users: function() {
                        return Users;
                    }
                }
            });
        }

        // var logout = function(callback) {
        //     auth.signout();
        //     store.remove('profile');
        //     store.remove('token');
        //     if (typeof(callback) == "function") {
        //         callback();
        //     }
        //     console.log("GO OUT");
        //     window.location = '/';
        // }
        // 
        var logout = function(callback) {
            store.remove('profile');
            store.remove('token');
            if (typeof(callback) == "function") {
                callback();
            }
            console.log("GO OUT");
            window.location = '/';
        }

        var auth = function() {
            var profile = store.get("profile");

            console.log("PROFLE GET", profile);
            if (profile !== null) {
                return {
                    isAuthenticated: true,
                    profile: profile
                }
            } else {
                return {
                    isAuthenticated: false,
                    profile: {}
                }
            }
        }

        return {
            'login': login,
            'logout': logout,
            'auth': auth
        };
    }
]);