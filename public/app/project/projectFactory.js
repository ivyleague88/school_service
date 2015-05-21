'use strict';



angular.module('project')
  

  .factory('Projects', ['$resource', function($resource){

    return $resource('/projects/:id', null, {
      'update': { method:'PUT' },
      'get' :  {method : 'GET' }
    });
  }]);





