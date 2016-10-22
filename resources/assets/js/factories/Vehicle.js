angular.module('LogasiaApp')
.factory('Vehicle', ['$resource', function ($resource) {
  return $resource('/vehicle/:id', { id: '@id' }, {
    update: { method: 'PUT' , params: {id: '@id'}, isArray: false },
    bulk: { url: '/vehicle/bulk', method: 'POST' , isArray: true }
  });
}]);
