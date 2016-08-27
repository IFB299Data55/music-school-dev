var listApp = angular.module("myList", []);

listApp.controller("listCtrl", function($scope) {
	$scope.products = ['Milk', 'Bread', 'Cheese'];
});