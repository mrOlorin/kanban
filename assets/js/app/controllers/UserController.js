(function () {
    'use strict';

    angular.module('Kanban')
            .controller('UserController', UserController);

    UserController.$inject = ['$scope', 'User', 'Session', 'toaster'];
    function UserController($scope, User, Session, toaster) {
        $scope.signupForm = {
            isLoading: false,
            validationErrors: []
        };
        $scope.loginForm = {
            isLoading: false
        };
        $scope.logoutForm = {
            isLoading: false
        };

        $scope.submitLoginForm = function () {
            $scope.loginForm.loading = true;
            var session = new Session({email: $scope.loginForm.email, password: $scope.loginForm.password});
            session.$save().then(function onSuccess(res) {
                window.location = '/';
            }).catch(function onError(sailsResponse) {
                var invalidCredentials = sailsResponse.status === 400 || 409;
                if (invalidCredentials) {
                    toaster.pop('error', "Error", "Invalid email/password combination.");
                    return;
                } else {
                    toaster.pop('error', 'Error', 'An unexpected error occurred.');
                    console.error('An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status));
                }
            }).finally(function eitherWay() {
                $scope.loginForm.loading = false;
            });
        };

        $scope.submitLogoutForm = function () {
            $scope.logoutForm.loading = true;
            var session = new Session();
            session.$delete().then(function onSuccess(res) {
                window.location = '/';
            }).catch(function onError(sailsResponse) {
                toaster.pop('error', 'Error', 'An unexpected error occurred.');
                console.error('An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status));
            }).finally(function eitherWay() {
                $scope.logoutForm.loading = false;
            });
        };

        $scope.submitSignupForm = function () {

            $scope.signupForm.loading = true;
            $scope.signupForm.validationErrors = [];

            var user = new User({email: $scope.signupForm.email, password: $scope.signupForm.password});
            user.$save().then(function onSuccess() {
                window.location = '/';
            }).catch(function onError(sailsResponse) {
                var emailAddressAlreadyInUse = sailsResponse.status === 409;
                if (emailAddressAlreadyInUse) {
                    toaster.pop('error', 'Error', 'That email address has already been taken, please try again.');
                } else {
                    toaster.pop('error', 'Error', 'An unexpected error occurred.');
                    console.error('An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status));
                }
            }).finally(function eitherWay() {
                $scope.signupForm.loading = false;
            });
        };
    }
})();