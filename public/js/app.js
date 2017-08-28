//Initialize Angular app
var app = angular.module('myApp', []);

app.controller('signupController', ['$scope', '$http', function($scope, $http) {
    console.log("this works?");
    
    $scope.sub = function() {
        $http.post('/view1',$scope.signup).
        success(function(data) {
            alert('Sent successfully!');
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    } 
}]); 
