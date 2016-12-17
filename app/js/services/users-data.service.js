(function () {
    'use strict';

    angular.module('usersListing')
        .factory('UsersDataService', UsersDataService);

    function UsersDataService($q, lodash, Restangular) {
        return {
            getUsers: getUsers,
            getUser: getUser,
            getUserPosts: getUserPosts,
            getUserAlbums: getUserAlbums,
            getUserAlbum: getUserAlbum,
            resolver: resolver
        }

        //
        // Public methods
        //

        /**
         *
         */
        function getUsers() {
            return Restangular.all('users').getList();
        }

        /**
         *
         */
        function getUser(userId) {
            return Restangular.one('users', userId).get();
        }

        /**
         *
         */
        function getUserPosts(userId) {
            return Restangular.one('users', userId).all('posts').getList();
        }

        /**
         *
         */
        function getUserAlbums(userId) {
            return Restangular.one('users', userId).all('albums').getList();
        }

        /**
         *
         */
        function getUserAlbum(userId, albumId) {
            return Restangular.one('users', userId).one('albums', albumId).get();
        }

        /**
         *
         */
        function resolver() {
            return getUsers()
                .then(function(users) {

                    // Buld relations for each user object
                    lodash.forEach(users, function(user) {

                        // Get all posts and albums related to user
                        // and then bind relations directly to user object
                        $q.all([getUserPosts(user.id), getUserAlbums(user.id)])
                            .then(function(resolvedArray){
                                user.userPosts = resolvedArray[0];
                                user.userAlbums = resolvedArray[1];

                                // Generate posts/albums relations randomly
                                generateRandomAlbumPostsRelations(user.userAlbums, user.userPosts);
                            });
                    });

                    return users;
                })
                .catch(function(error){
                    console.error('Server Error: ', error);
                });
        }

        //
        // Private methods
        //

        /**
         *
         */
        function generateRandomAlbumPostsRelations(albums, posts) {
            angular.forEach(posts, function(post){
                var randomAlbum = albums[lodash.random(0, albums.length-1)];

                post.rels = post.rels|| {};
                post.rels.album = randomAlbum;
                post.albumId = post.rels.album.id;

                post.isHidden = false;

                randomAlbum.rels = randomAlbum.rels || {posts: []};
                randomAlbum.rels.posts.push(post);
            });

        }

    }

}());
