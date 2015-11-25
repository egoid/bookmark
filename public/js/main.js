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
    })
    .state('new', {
      url: "/new",
      templateUrl: "new.html",
      controller: "tagCtrl"
    });
});

myapp.controller('tagCtrl', function($scope, $http){
  $http.get('/tag').then(function (resp){
    $scope.tags = resp.data;
  });
  $scope.submit = function(x, y, z){
    var link = {name: x, url: y, tags: z}
    $http.post('/link', link).then(function (resp){
      $scope.finish = resp.data; 
    })   
  };
})

myapp.controller('LinkCtrl', function($scope, $http, linkService){
  $http.get('/link').then(function (resp){
    linkService.saveLinks(resp);
    $scope.links = linkService.getLink();
  });  
});

// myapp.service('getTagName', function($http, $httpParamSerializer){
//   this.id = function(tagId){
//     var url = '/tag/:id'.replace(':id', tagId);
//     $http.get(url).then(function(resp){
//       return(resp.data.name)
//     });
//   }
// })


myapp.service('linkService', function (){
  var links =[];
  this.getLink = function (){
    return links;
  }
  this.saveLinks = function (resp){
    links = resp.data.slice(0);
  }

})