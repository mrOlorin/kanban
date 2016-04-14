(function () {
    'use strict';

    angular.module('Kanban')
            .controller('KanbanController', KanbanController);

    KanbanController.$inject = ['$scope', 'Kanban', 'toaster'];
    function KanbanController($scope, Kanban, toaster) {
        var stopAutoSave;
        $scope.kanbanIsLoading = false;
        $scope.pageIsInitialized = false;
        $scope.kanban = {};
        $scope.templates = [];

        (function getKanban() {
            $scope.kanbanIsLoading = true;
            var kanban = new Kanban({userId: SAILS_LOCAL.me.id});
            kanban.$get().then(function onSuccess(response) {
                $scope.templates = response.templates;
                $scope.kanban = response.kanban;

                stopAutoSave = autoSave(1000);
            }).catch(function onError(sailsResponse) {
                if (sailsResponse.status === 404) {

                } else {
                    toaster.pop('error', 'Error', 'An unexpected error occurred.');
                    console.error('An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status));
                }
            }).finally(function eitherWay() {
                $scope.kanbanIsLoading = false;
                $scope.pageIsInitialized = true;
            });
        })();

        function autoSave(saveTimeout) {
            saveTimeout = saveTimeout | 1000;
            var saveTimeoutId;
            return $scope.$watch('kanban.dropzones', function (oldKanban, newKanban) {
                clearTimeout(saveTimeoutId);
                saveTimeoutId = setTimeout(function () {
                    if (angular.equals(newKanban, oldKanban)) {
                        return;
                    }
                    $scope.save();
                }, saveTimeout);
            }, true);
        }

        $scope.save = function () {
            $scope.kanbanIsLoading = true;
            var kanban = new Kanban({userId: SAILS_LOCAL.me.id, kanban: $scope.kanban});
            kanban.$save().then(function onSuccess(response) {
                toaster.pop('success', 'Saved', 'Kanban saved.', 500);
            }).catch(function onError(sailsResponse) {
                toaster.pop('error', 'Error', 'Unexpected error.');
                console.error('An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status));
            }).finally(function eitherWay() {
                $scope.kanbanIsLoading = false;
            });
        };

    }
})();