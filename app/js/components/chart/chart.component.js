(function () {
    'use strict';

    angular.module('usersListing')
        .component('uliChart', {
            bindings: {
                users: '<'
            },
            templateUrl: 'js/components/chart/chart.component.tpl.html',
            controller: UliChartController
        });

    function UliChartController(lodash) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        //
        // Public methods
        //

        //
        // Private methods
        //

        function onInit() {
            ctrl.chartConfig = {
                options: {
                    chart: {
                        type: 'column',
                        height: '300'
                    },
                    colors: [
                        '#4fbf43',
                        '#f59a26'
                    ],
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: null
                        }
                    }
                },
                series: [
                    {
                        name: 'Posts',
                        data: lodash.map(ctrl.users, function(user) {
                            return user.userPosts.length;
                        })
                    },
                    {
                        name: 'ALbums Used',
                        data: lodash.map(ctrl.users, function(user) {
                            var albumsUsed = 0;

                            // Here we`re calculating an albums used q-ty (which are not empty)
                            // It`s made for better looking chart results on UI,
                            // cause server always returns the same total albums q-ty
                            lodash.forEach(user.userAlbums, function(album) {
                                if (lodash.get(album, 'rels.posts', []).length) {
                                    albumsUsed ++;
                                }
                            });

                            return albumsUsed;
                        })
                    }
                ],
                title: {
                    text: null
                },

                xAxis: {
                    categories: lodash.map(ctrl.users, function(user) {
                        return user.name;
                    })
                },

                loading: false
            }
        }
    }
}());
