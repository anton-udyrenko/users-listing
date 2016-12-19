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

    function UliUsersController() {
        var ctrl = this;

    }
}());