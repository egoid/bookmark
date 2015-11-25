 var myapp = angular.module('myapp', ["ui.router"]);

myapp.config(function($stateProvider, $urlRouterProvider){

 $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('main', {
        url: "/",
        templateUrl: "main.html",
        controller: "LinkCtrl"
    })
    .state('new', {
        url: "/new",
        templateUrl: "new.html",
        controller: "addCtrl"
    })
    .state('tags', {
        url: "/tags",
        templateUrl: "tags.html",
        controller: "tagCtrl"
    });
});

myapp.controller('addCtrl', function ($scope, $http){
  $scope.addLink = function (){
    console.log('kk');
  }
})

myapp.controller('tagCtrl', function($scope, $http, tagService){
  $http.get('/tag').then(function (resp){
    tagService.saveTags(resp);
    $scope.tags = tagService.getTags();
  })
})

myapp.controller('LinkCtrl', function($scope, $http, linkService){
  $http.get('/link').then(function (resp){
    linkService.saveLinks(resp);
    $scope.links = linkService.getLink();
  })
})

myapp.service('tagService', function (){
  var tags = {};
  this.saveTags = function (resp){
    resp.data.forEach(function (obj){
      tags[obj._id] = obj;
    });
  }
  this.getTags = function (){
    return tags;
  }
  this.getSingleTag = function (key){
    return tags.key;
  }
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