(function () {
    'use strict';

    angular.module('Kanban')
            .factory('User', User);

    User.$injects = ['$resource'];
    function User($resource) {
        return $resource('/user/:id', {id: '@id'});
    }
})();