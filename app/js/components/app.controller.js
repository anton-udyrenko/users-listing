(function () {
    'use strict';

    angular.module('usersListing')
        .controller('AppController', AppController);

    function AppController($scope) {
        var vm = this;

        activate();

        function activate() {
            console.log('test!');
        }
    }
}());
