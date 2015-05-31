'use strict';

var ADMIN_EMAIL = 'schoolservice2@gmail.com';

// app.js
angular.module('app', ['auth0','project','home', 'angular-storage', 'angular-jwt'])
.config(function (authProvider) {
  authProvider.init({
    domain: 'miratik1.auth0.com',
    clientID: 'FOrVLNPaeqV6M1xjG5cHnpstTzBxQBVq',
    loginUrl: '/login'
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show Login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});
;