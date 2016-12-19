(function () {
    'use strict';

    angular.module('usersListing')
        .config(routes);

        function routes($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/',
                    template: '<uli-main-wrapper class="uli-main-wrapper uli-row uli-component"><uli-main-wrapper>'
                })
                .state('app.users', {
                    url: 'users',
                    views: {
                        content: {
                            template: '<uli-users data-users="$resolve.users" class="uli-users uli-row uli-component"><uli-users>'
                        }
                    },
                    resolve: {
                        users: function(UsersDataService) {
                            return UsersDataService.resolver();
                        }
                    }
                })
                .state('app.user', {
                    url: 'users/:id',
                    views: {
                        content: {
                            template: '<uli-user-details class="uli-row uli-component"><uli-user-details>'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/users');
        }
}());