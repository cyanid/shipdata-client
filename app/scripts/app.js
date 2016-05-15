'use strict';

/**
 * @ngdoc overview
 * @name shipdataClientApp
 * @description
 * # shipdataClientApp
 *
 * Main module of the application.
 */
angular
  .module('shipdataClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'angularMoment'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

      RestangularProvider.setBaseUrl('https://lansisatama-shipdata.herokuapp.com/');
  });
