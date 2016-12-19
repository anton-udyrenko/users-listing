(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliAlbumsPopup', {
            bindings: {
                album: '<',
                user: '<'
            },
            templateUrl: 'js/components/albums-popup/albums-popup.component.tpl.html',
            controller: UliAlbumsPopupController
        });

    function UliAlbumsPopupController($http, $state, $stateParams) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {

        }
    }
}());
