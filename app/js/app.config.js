(function () {
    'use strict';

    angular.module('usersListing')
        .config(config);

        function config($locationProvider, RestangularProvider) {
            RestangularProvider.setBaseUrl('http://jsonplaceholder.typicode.com');
        }
}());