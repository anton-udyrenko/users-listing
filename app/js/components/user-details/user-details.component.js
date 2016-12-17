(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliUserDetails', {
            templateUrl: 'js/components/user-details/user-details.component.tpl.html',
            controller: UliUserDetailsController
        });

    function UliUserDetailsController($http, $state, $stateParams) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        console.log($stateParams);

        function onInit () {
            $http.get('http://jsonplaceholder.typicode.com/users/' + $stateParams.id)
                .then(function(data) {
                    ctrl.user = data.data;
                });
        }
    }
}());