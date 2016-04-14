(function () {
    'use strict';

    angular.module('Kanban', [
        'ngRoute',
        'ngResource',
        'dndLists',
        'content-editable',
        'toaster'
    ]).config(config).run(run);

    config.$inject = [];
    function config() {
    }

    run.$inject = [];
    function run() {
    }
})();
