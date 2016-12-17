(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliSearchPosts', {
            bindings: {
                userId: '<'
            },
            templateUrl: 'js/components/search-posts/search-posts.component.tpl.html',
            controller: UliSearchPostsController
        });

        function UliSearchPostsController($rootScope, $scope) {
            var ctrl = this;

            ctrl.searchQuery = '';

            ctrl.$onInit = onInit;

            ctrl.makeSearch = makeSearch;

            //
            // Public methods
            //
            function makeSearch() {
                var dataObj = {
                    searchQuery: ctrl.searchQuery,
                    userId: ctrl.userId || null
                };

                $rootScope.$broadcast('search-posts_make-search', dataObj);

                console.log('makeSearch!', dataObj);
            };

            //
            // Private methods
            //

            /**
             *
             */
            function onInit() {
                $scope.$on('search-posts_make-search', resetIndividualSearches);
            }

            /**
             * Reset individual search queries if a global search has been performed
             */
            function resetIndividualSearches(ev, data) {
                if (ctrl.userId && data.userId === null) {
                    ctrl.searchQuery = '';
                }
            }
        }
}());