//Initialize Angular app
var app = angular.module('myApp', ['ngMessages']);



app.factory("flash", function($rootScope) {
   
   $rootScope.notification = {
                message: "",
                type: 'success', 
    };  
   
  return {
    setMessage: function(message, type) {
      $rootScope.notification = {
                message: message,
                type: type              
      };  
    },
    isMessage: function(){
        if($rootScope.notification.message == ""){
            return false;
        }else{
            return true;
        }
    },
    hideFlash: function(){
        $rootScope.notification.message = "";
    }
    
  };
  
});

app.controller('signupController', ['flash', '$scope', '$http', '$httpParamSerializer', function(flash, $scope, $http, $httpParamSerializer) {
    
    //$scope.flash = flash;
    $scope.flash = flash;
   
     
    $scope.sub = function() {
        /*
        if($scope.signup.$valid){
            
        }
        
        
        $http.post('/form',$scope.signup).
        success(function(data) {
            alert('Sent successfully!');          
            flash.setMessage("Successfully submitted!", 'success');
        }).error(function(data) {
            alert('Error: ', data);
             flash.setMessage("Error, submit was not succesful", 'danger');
        })
        */
        console.log("Scope.signup: ", $scope.signup.name);
        $http({
            method: 'POST',
            url: '/form', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $httpParamSerializer($scope.signup)
        })
        .then(function(res){
            
             flash.setMessage("Successfully sent form!", 'success');
             console.log($scope.notification.message);
        })
        .catch(function(err){
            flash.setMessage("Error" , 'danger');
            console.log($scope.flash.isMessage());
        });
    } 
}]); 
