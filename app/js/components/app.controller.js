(function () {
    'use strict';

    angular.module('usersListing')
        .controller('AppController', AppController);

    function AppController($scope) {
        var vm = this;

        // Test great ctrl!
        activate();

        function activate() {
            console.log('test!');
        }
    }
}());
