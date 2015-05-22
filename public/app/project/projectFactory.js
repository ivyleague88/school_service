'use strict';



angular.module('project')
  

  .factory('Projects', ['$resource', function($resource){

    return $resource('/api/projects/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' }
    });
  }])
  .factory('Users', ['$resource', function($resource){

    return $resource('/api/users/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' },
      'upsert':   {method:'PUT', 'url' : '/api/users/upsert/:user_id'},
    });
  }]);





