'use strict';



angular.module('project')
  

  .factory('Projects', ['$resource', function($resource){

    return $resource('/api/projects/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' },
      'getByUserId' : {method : 'GET', 'url' : '/api/projects/by_user_id/:user_id', isArray : true}
    });
  }])
  .factory('Users', ['$resource', function($resource){

    return $resource('/api/users/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' },
      'upsert':   {method:'PUT', 'url' : '/api/users/upsert/:user_id'},
      'getByUserId' : {method : 'GET', 'url' : '/api/users/by_id/:user_id'}
    });
  }]);





