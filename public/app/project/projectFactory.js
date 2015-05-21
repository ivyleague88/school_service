'use strict';



angular.module('project')
  

  .factory('Projects', ['$resource', function($resource){

    return $resource('/api/projects/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' }
    });
  }]);





