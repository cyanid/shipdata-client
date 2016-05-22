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

    var previousShips = Restangular.all('shipDataHistory');
    previousShips.getList().then(function (shipData) {
      //console.log('got ship data');
      //console.log(shipData);

      //$scope.shipData = shipData;
      //$scope.shipDataReady = true;

      $scope.previousShipData.shipName = shipData[shipData.length - 3].shipName;
      $scope.previousShipData.firmName = shipData[shipData.length - 2].firmName;
      $scope.previousShipData.arrivalTime = shipData[shipData.length - 1].arrivalTime;

    });

    $scope.getMoreShips = function () {
      console.log('get more ships');
      $scope.shipAmountOffset = $scope.shipAmountOffset + 3;

      $scope.moreShipDataShip = $scope.shipData[0 + $scope.shipAmountOffset].shipName;
      $scope.moreShipDataFirm = $scope.shipData[1 + $scope.shipAmountOffset].firmName;
      $scope.moreShipDataArrivalTime = $scope.shipData[2 + $scope.shipAmountOffset].arrivalTime;

      $scope.moreShips = true;

      //console.log($scope.moreShipData);
    };

    $scope.fetchCurrent = function () {
      //console.log('fetch current');
      $scope.shipDataReady = false;

      $scope.shipAmountOffset = 0;

      var currentShips = Restangular.all('shipData');
      currentShips.getList().then(function (shipData) {
        //console.log('got ship data');
        //console.log(shipData);
        if (shipData[1 + $scope.shipAmountOffset].firmName.indexOf('C & C Port Agency') >= 0 || shipData[1 + $scope.shipAmountOffset].firmName.indexOf('ESL Shipping') >= 0) {
          $scope.shipAmountOffset = $scope.shipAmountOffset + 3;
        }

        var arrivalMoment = new Date(shipData[2 + $scope.shipAmountOffset].arrivalTime);

        if (arrivalMoment.getTime() < new Date().getTime()) {
          $scope.shipAmountOffset = $scope.shipAmountOffset + 3;
        }

        $scope.nextShipData.shipName = shipData[0 + $scope.shipAmountOffset].shipName;
        $scope.nextShipData.firmName = shipData[1 + $scope.shipAmountOffset].firmName;
        $scope.nextShipData.arrivalTime = shipData[2 + $scope.shipAmountOffset].arrivalTime;

        $scope.shipData = shipData;
        $scope.shipDataReady = true;

      });
    };

    $scope.fetchCurrent();
  });
