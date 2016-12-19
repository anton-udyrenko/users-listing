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

        function UliSearchPostsController($rootScope, $scope, $element) {
            var ctrl = this;
            var searchInput;

            ctrl.searchQuery = '';

            ctrl.$onInit = onInit;
            ctrl.$postLink = postLink;

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
             * Init hook
             */
            function onInit() {
                $scope.$on('search-posts_make-search', resetIndividualSearches);
            }

            /**
             * DOM-manipulation hook
             */
            function postLink() {
                searchInput = $element.find('#searchInput');
                searchInput.on('keydown keypress', blurOnEnter);
            }

            /**
             * Destroy hook
             */
            function $onDestroy() {
                searchInput.off('keydown keypress', blurOnEnter);
            }

            /**
             * Resets individual search queries if a global search has been performed
             */
            function resetIndividualSearches(ev, data) {
                if (ctrl.userId && data.userId === null) {
                    ctrl.searchQuery = '';
                }
            }

            /**
             * Triggers input blur on enter keypress
             */
            function blurOnEnter(event) {
                if(event.which === 13) {
                    this.blur();
                }
            }
        }
}());