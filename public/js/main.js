 var myapp = angular.module('myapp', ["ui.router"]);

myapp.config(function($stateProvider, $urlRouterProvider){

 $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('main', {
        url: "/",
        templateUrl: "main.html",
        controller: "LinkCtrl"
    })
    .state('tags', {
        url: "/tags",
        templateUrl: "tags.html",
        controller: "tagCtrl"
    });
});

myapp.controller('tagCtrl', function($scope, $http){
  $http.get('/tag').then(function (resp){
    $scope.tags = resp.data;
  })
})

myapp.controller('LinkCtrl', function($scope, $http, linkService){
  $http.get('/link').then(function (resp){
    linkService.saveLinks(resp);
    $scope.links = linkService.getLink();
  })
})

myapp.service('linkService', function (){
  var links =[];
  this.getLink = function (){
    return links;
  }
  this.saveLinks = function (resp){
    links = resp.data.slice(0);
  }

})