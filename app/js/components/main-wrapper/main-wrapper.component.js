(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliMainWrapper', {
            templateUrl: 'js/components/main-wrapper/main-wrapper.component.tpl.html',
            controller: UliMainWrapperController
        });

    function UliMainWrapperController($http) {
        var ctrl = this;
    }
}());