// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'satellizer', 'starter.controller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function($auth, $rootScope, $state){
 
    $rootScope.$on('$stateChangeStart', function(event, next, current){
      if(next.name != 'auth'){
        if(!$auth.isAuthenticated()){
          event.preventDefault();          
        } 
      } else {
        if($auth.isAuthenticated()){
          event.preventDefault();
          $state.go('users');
        }
      }
    });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
  
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  
  $authProvider.baseUrl = 'http://192.168.178.35:8000';
  $authProvider.loginUrl = '/api/authenticate';
  
  $urlRouterProvider.otherwise('users');
  
  $stateProvider
  .state('auth', {
    url: '/auth',
    templateUrl: 'templates/authView.html',
    controller: 'AuthController as auth'
  })
  .state('users', {
    url: '/users',
    templateUrl: 'templates/usersView.html',
    controller: 'UserController as user'
  })
})
