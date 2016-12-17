(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliUsers', {
            bindings: {
                users: '<'
            },
            templateUrl: 'js/components/users/users.component.tpl.html',
            controller: UliUsersController
        });

    function UliUsersController($http, $q, $state, lodash, Restangular, UsersDataService) {
        var ctrl = this;

        //
        // Public methods
        //
        ctrl.goToUserDetails = function goToUserDetails(event, id) {
            $state.go('app.user', {
                id: id
            });
        }

        //
        // Private methods
        //

        function onInit() {

        }

    }
}());