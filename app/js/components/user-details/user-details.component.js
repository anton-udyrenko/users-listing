(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliUserDetails', {
            templateUrl: 'js/components/user-details/user-details.component.tpl.html',
            controller: UliUserDetailsController
        });

    function UliUserDetailsController($http, $stateParams, UsersDataService) {
        var ctrl = this;


        ctrl.$onInit = onInit;

        function onInit () {
            UsersDataService.getUser($stateParams.id)
                .then(function(data) {
                    ctrl.user = data;
                });
        }
    }
}());