'use strict';


// app.js
angular.module('app', ['auth0','project','home', 'angular-storage', 'angular-jwt'])
.config(function (authProvider) {
  authProvider.init({
    domain: 'miratik1.auth0.com',
    clientID: 'FOrVLNPaeqV6M1xjG5cHnpstTzBxQBVq'
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});