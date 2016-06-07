angular.module('starter.controller', [])
.controller('AuthController', function($auth, $state, $ionicPopup, 
            $ionicNavBarDelegate, $ionicLoading){
    
    $ionicNavBarDelegate.showBackButton(false);
    
    var vm = this;
    
    vm.email = "ryanchenkie@gmail.com";
    vm.password = "secret";

    vm.login = function(){
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
        var credentials = {
            email: vm.email,
            password: vm.password
        }
        
        $auth.login(credentials).then(function(response){
            $state.go('users', {});
            $ionicLoading.hide();
        }).catch(function(error){
            console.log(error);
            $ionicPopup.show({
                title: 'Interner Fehler',
                template: error.data
            });
        });
    }
})
.controller('UserController', function($http, $ionicPopup, $ionicLoading, 
    $state, $ionicNavBarDelegate, $auth){
    
    $ionicNavBarDelegate.showBackButton(true);                                        
                                            
    var vm = this;
    
    vm.users;
    vm.error;
    
    vm.getUsers = function(){
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        $http.get('http://192.168.178.35:8000/api/authenticate').success(function(users){
            vm.users = users;
            $ionicLoading.hide();
        }).error(function(error){
            vm.error = error.error;
            if(vm.error == "token_not_provided"){
               $ionicPopup.show({
                title: 'Authentifizierung fehlgeschlagen',
                template: "<p>Ihre Sitzung ist abgelaufen!</p>",
                buttons: [
                    {
                        text: "Cancel",
                        onTap: function(e){
                            $state.go('auth');
                        }
                    }
                ]
            }); 
            }
            $ionicLoading.hide();
        });
    }
    
    vm.logout = function(){
        $auth.logout();
        $state.go('auth');
    }
})