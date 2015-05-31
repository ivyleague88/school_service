'use strict';



angular.module('project')
  

  .factory('Projects', ['$resource', function($resource){

    return $resource('/api/projects/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' },
      'apply' :  {method : 'POST', 'url' : '/api/projects/apply' },
      'search' :  {method : 'GET','url' : '/api/projects/search', isArray : true },
      'invited' :  {method : 'GET','url' : '/api/projects/invited', isArray : true },
      'featured' :  {method : 'GET','url' : '/api/projects/featured', isArray : true },
      'getByUserId' : {method : 'GET', 'url' : '/api/projects/by_user_id/:user_id', isArray : true},
      'getCompletedProjectsByUserId' : {method : 'GET', 'url' : '/api/projects/completed/by_user_id/:user_id', isArray : true}
    });
  }])
  .factory('Users', ['$resource', function($resource){

    return $resource('/api/users/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' },
      'getMatches' :  {method : 'GET', 'url' : '/api/users/matches', isArray : true },
      'featured' :  {method : 'GET','url' : '/api/users/featured', isArray : true },
      'upsert':   {method:'PUT', 'url' : '/api/users/upsert/:user_id'},
      'getByUserId' : {method : 'GET', 'url' : '/api/users/by_id/:user_id'}
    });
  }])
  .factory('Email', ['$resource', function($resource){

    return $resource('/api/email/:id', null, {
      'apply': { method:'POST', url : '/api/email/apply' },
      'invite': { method:'POST', url : '/api/email/invite' }
    });
  }]);
  





