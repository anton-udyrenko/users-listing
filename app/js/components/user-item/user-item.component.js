(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliUserItem', {
            bindings: {
                user: '<'
            },
            templateUrl: 'js/components/user-item/user-item.component.tpl.html',
            controller: UliUserItemController
        });

    function UliUserItemController($filter, $q, $scope, $state, $timeout, lodash, Restangular, UsersDataService) {
        var ctrl = this;

        ctrl.isInfoBlockShown = false;

        ctrl.$onInit = onInit;

        ctrl.toggleInfoBlock = toggleInfoBlock;
        ctrl.goToUserDetails = goToUserDetails;

        //
        // Public methods
        //


        /**
         *
         */
        function toggleInfoBlock() {
            ctrl.isInfoBlockShown = !ctrl.isInfoBlockShown;
        }

        /**
         *
         */
        function goToUserDetails(event, id) {
            $state.go('app.user', {
                id: id
            });
        }

        //
        // Private methods
        //

        /**
         *
         */
        function onInit() {
            $scope.$on('search-posts_make-search', makeSearchForThisUser);
        }

        /**
         *
         */
        function makeSearchForThisUser(ev, data) {
            console.log('makeSearchForThisUser!', data, (data.userId === ctrl.user.id || data.userId === null));

            if (data.userId === ctrl.user.id || data.userId === null) {
                if (data.searchQuery) {

                    // Filter serch results
                    angular.forEach(ctrl.user.userPosts, function(post) {
                        if(lodash.includes(post.title, data.searchQuery) || lodash.includes(post.body, data.searchQuery)) {
                            post.isHidden = false;
                        } else {
                            post.isHidden = true;
                        }
                    });

                    ctrl.isInfoBlockShown = true;
                } else {

                    // Make all posts visible again
                    angular.forEach(ctrl.user.userPosts, function(post) {
                        post.isHidden = false;
                    });

                    ctrl.isInfoBlockShown = false;
                }
            }
        }
    }
}());