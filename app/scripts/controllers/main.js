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
    $scope.moreShips = false;

    $scope.shipAmountOffset = 0;

    var baseAccounts = Restangular.all('shipData');

    // This will query /accounts and return a promise.
    //console.log('main ctrl');
    baseAccounts.getList().then(function (shipData) {
      //console.log('got ship data');
      //console.log(shipData);

      $scope.shipData = shipData;
      $scope.shipDataReady = true;

      $scope.nextShipData.shipName = shipData[0 + $scope.shipAmountOffset].shipName;
      $scope.nextShipData.firmName = shipData[1 + $scope.shipAmountOffset].firmName;
      $scope.nextShipData.arrivalTime = shipData[2 + $scope.shipAmountOffset].arrivalTime;

    });

    $scope.getMoreShips = function () {
      console.log('get more ships');
      $scope.shipAmountOffset = $scope.shipAmountOffset + 3;

      $scope.moreShipDataShip = $scope.shipData[0 + $scope.shipAmountOffset].shipName;
      $scope.moreShipDataFirm = $scope.shipData[1 + $scope.shipAmountOffset].firmName;
      $scope.moreShipDataArrivalTime = $scope.shipData[2 + $scope.shipAmountOffset].arrivalTime;

      $scope.moreShips = true;

      console.log($scope.moreShipData);
    };
  });
