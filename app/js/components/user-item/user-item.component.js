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

    function UliUserItemController($scope, $state, lodash, ngDialog) {
        var ctrl = this;

        ctrl.isInfoBlockShown = false;

        ctrl.$onInit = onInit;

        ctrl.toggleInfoBlock = toggleInfoBlock;
        ctrl.goToUserDetails = goToUserDetails;
        ctrl.openAlbumsDialog = openAlbumsDialog;

        //
        // Public methods
        //


        /**
         * Toggles block with posts/albums content
         */
        function toggleInfoBlock() {
            ctrl.isInfoBlockShown = !ctrl.isInfoBlockShown;
        }

        /**
         * Redirects to user details view (forfuture needs, not required now)
         */
        function goToUserDetails(event, id) {
            $state.go('app.user', {
                id: id
            });
        }

        /**
         * Creates and opens new user dialog
         */
        function openAlbumsDialog(album) {
            ngDialog.open({
                template: '<uli-albums-popup data-album="ngDialogData.album" data-user="ngDialogData.user" class="uli-albums-popup" data-close-dialog="closeThisDialog()"></uli-albums-popup>',
                plain: true,
                scope: $scope,
                data: {
                    album: album,
                    user: ctrl.user
                },
                className: 'ngdialog-theme-default ngdialog-theme-uli'
            });
        }

        //
        // Private methods
        //

        /**
         * Init method
         */
        function onInit() {
            $scope.$on('search-posts_make-search', makeSearchForThisUser);
        }

        /**
         * Performs posts search
         */
        function makeSearchForThisUser(ev, data) {
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