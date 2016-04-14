(function () {
    'use strict';

    angular.module('Kanban')
            .factory('Session', Session);

    Session.$injects = ['$resource'];
    function Session($resource) {
        return $resource('/session/:userId', {userId: '@id'});
    }
})();
