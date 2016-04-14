(function () {
    'use strict';

    angular.module('Kanban')
            .factory('Kanban', Kanban);

    Kanban.$injects = ['$resource'];
    function Kanban($resource) {
        return $resource('/kanban/:userId', {userId: '@userId'});
    }
})();
