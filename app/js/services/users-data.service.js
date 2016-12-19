(function () {
    'use strict';

    angular.module('usersListing')
        .factory('UsersDataService', UsersDataService);

    function UsersDataService($q, $timeout, lodash, Restangular) {
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
         * Resolver method, used in ui-router before main users controller inits
         */
        function resolver() {
            var usersData;

            return getUsers()
                .then(function(users) {
                    var postsAndAlbumsRequests = [];

                    // Save received users data to an outer variable
                    usersData = users;

                    // For each user object create a combined request
                    // to get all related posts and albums
                    lodash.forEach(usersData, function(user) {
                        postsAndAlbumsRequests.push($q.all([getUserPosts(user.id), getUserAlbums(user.id)]));
                    });

                    // Return all combined promises like a single promise
                    return $q.all(postsAndAlbumsRequests);
                })
                .then(function(resolvedPostsAndAlbums) {

                    console.log('resolvedPostsAndAlbums?', resolvedPostsAndAlbums);
                    // Bind related posts and albums directly to the each user object
                    // and generate random relations between posts and albums for that user
                    lodash.forEach(usersData, function(user, index) {
                        user.userPosts = resolvedPostsAndAlbums[index][0];
                        user.userAlbums = resolvedPostsAndAlbums[index][1];

                        generateRandomAlbumPostsRelations(user.userAlbums, user.userPosts);
                    });

                    return usersData;
                })
                .catch(function(error){
                    console.error('Server Error: ', error);
                });
        }

        //
        // Private methods
        //

        /**
         * Generates random relations between posts and albums for that user
         */
        function generateRandomAlbumPostsRelations(albums, posts) {
            angular.forEach(posts, function(post){
                var randomAlbum = albums[lodash.random(0, albums.length-1)];

                post.rels = post.rels || {};
                post.rels.album = randomAlbum;
                post.albumId = post.rels.album.id;

                // Set property to be used for search results displaying
                post.isHidden = false;

                randomAlbum.rels = randomAlbum.rels || {posts: []};
                randomAlbum.rels.posts.push(post);
            });

        }

    }

}());
