'use strict';

/**
 * @ngdoc function
 * @name shipdataClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shipdataClientApp
 */
angular.module('shipdataClientApp')
    .controller('MainCtrl', function ($scope, Restangular, amMoment) {
        amMoment.changeLocale('fi');

        $scope.shipDataReady = false;
        $scope.shipData = {};
        $scope.moreShipData = [];
        $scope.nextShipData = {};
        $scope.previousShipData = {};
        $scope.moreShips = false;

        $scope.shipAmountOffset = 0;

        $scope.getMoreShips = function () {
            //console.log('get more ships');
            $scope.shipAmountOffset = $scope.shipAmountOffset + 3;

            $scope.moreShipDataShip = $scope.shipData[1].shipName;
            $scope.moreShipDataFirm = $scope.shipData[1].firmName;

            var arrivalTime = $scope.shipData[1].arrivalTime;
            arrivalTime = arrivalTime.substr(3, 2) + '.' + arrivalTime.substr(0, 2) + '. ' + arrivalTime.substr(6, 5);

            $scope.moreShipDataArrivalTime = arrivalTime;

            $scope.moreShips = true;
        };

        $scope.fetchCurrent = function () {
            //console.log('fetch current');
            $scope.shipDataReady = false;

            $scope.shipAmountOffset = 0;

            var currentShips = Restangular.all('shipData');
            currentShips.getList().then(function (shipData) {
                //console.log('got ship data');
                //console.log(shipData[0]);

                $scope.nextShipData.shipName = shipData[0].shipName;
                $scope.nextShipData.firmName = shipData[0].firmName;

                var arrivalTime = shipData[0].arrivalTime;

                arrivalTime = arrivalTime.substr(3, 2) + '.' + arrivalTime.substr(0, 2) + '. ' + arrivalTime.substr(6, 5);

                $scope.nextShipData.arrivalTime = arrivalTime;

                $scope.shipData = shipData;
                $scope.shipDataReady = true;

            });
        };

        $scope.fetchCurrent();
    });
