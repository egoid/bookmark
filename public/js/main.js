 var myapp = angular.module('myapp', ["ui.router", "ui.bootstrap"]);

myapp.config(function($stateProvider, $urlRouterProvider){

 $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('main', {
        url: "/",
        templateUrl: "main.html",
        controller: "LinkCtrl"
    })
    .state('aTag', {
        url: "/tags/:id",
        templateUrl: "singleTag.html",
        controller: "singleTagCtrl"
    })
    .state('tags', {
        url: "/tags",
        templateUrl: "tags.html",
        controller: "tagCtrl"
    })
    .state('new', {
      url: "/new",
      templateUrl: "new.html",
      controller: "addCtrl"
    });
});

myapp.controller('modalCtrl', function ($scope, $uibModal, $log) {

  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };
})

myapp.controller('ModalInstanceCtrl',function ($scope, $uibModalInstance, $http, tagService, $state) {

  $scope.ok = function (val) {
    $http.post('/tag', {name:val}).then(function (resp){
      var arr = [resp.data];
      tagService.saveTags(arr);
      $uibModalInstance.close($scope);    
      $state.go('tags');
    })
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

myapp.controller('singleTagCtrl', function ($scope, tagService, $stateParams, $state){
  if (tagService.getSingleTag($stateParams.id)){
    $scope.tag = tagService.getSingleTag($stateParams.id);
  }else{
    tagService.pullTags().then(function (resp){
      tagService.saveTags(resp.data);
      $scope.tag = tagService.getSingleTag($stateParams.id);
    })
  }
  $scope.setEditable = function (){
    var h2 = document.getElementsByTagName('h2')
    angular.element(h2).attr('contenteditable', "true");
  }

  $scope.checkEnter = function (e, id){
    console.log(e.which);
    if (e.which===13){
      console.log('enter');
      var h2 = document.getElementsByTagName('h2')
      angular.element(h2).attr('contenteditable', "false");
      var updatedName = angular.element(h2).text();
      tagService.updateTagName(id, updatedName).then(function (resp){
        $state.go('tags');
        
      })
    }
  }
})

myapp.controller('addCtrl', function ($scope, tagService, linkService, $state){
  var tagRefArr = [];
  if (Object.keys(tagService.getTags()).length){
    $scope.tags = tagService.getTags();
  }else{
    tagService.pullTags().then(function (resp){
      tagService.saveTags(resp.data);
      $scope.tags = tagService.getTags();
    })
  }

  $scope.postLink = function (name, url){
    if (tagRefArr.length===0){
      alert('Tags are required!');
      return;
    }
    var linkObj = {name:name, url:url, tags:tagRefArr};
    linkService.postLink(linkObj).then(function (resp){
      linkService.saveLink(resp);
      $state.go('main');
    });
  }
  $scope.clicked = function (key){
    var idx = tagRefArr.indexOf(key);
    if (idx===-1){
      tagRefArr.push(key);
    }else{
      tagRefArr.splice(idx,1);
    }
    $scope.tags[key].click = !$scope.tags[key].click;

  }
})

myapp.controller('tagCtrl', function($scope, $http, tagService){
  tagService.pullTags().then(function (resp){
    tagService.saveTags(resp.data);
    $scope.tags = tagService.getTags();
  })
  $scope.del = function(x){
    var path = "/tag/" + x
    $http.delete(path).then(function (resp){
      $scope.deleted = (resp.data);
    });   
  }

})

myapp.controller('LinkCtrl', function($scope, $http, linkService){
  if ((linkService.getLink()).length===0){
    $http.get('/link').then(function (resp){
      linkService.saveLinks(resp);
      $scope.links = linkService.getLink();
    });
  }else{
    $scope.links = linkService.getLink();
  }

  $scope.del = function(x){
    var path = "/link/" + x
    $http.delete(path).then(function (resp){
      $scope.deleted = (resp.data);
    });   
  }

});

myapp.service('tagService', function ($http){
  var tags = {};
  this.saveTags = function (resp){
    resp.forEach(function (obj){
      tags[obj._id] = obj;
    });
  }
  this.getTags = function (){
    return tags;
  }
  this.getSingleTag = function (key){
    return tags[key];
  }
  this.pullTags = function (){
    return $http.get('/tag');
  }
  this.updateTagName = function (id, name){
    return $http.put('/tag', {_id:id, name:name});
  }
})

myapp.service('linkService', function ($http){
  var links =[];
  this.getLink = function (){
    return links;
  }
  this.saveLinks = function (resp){
    links = resp.data.slice(0);
  }
  this.saveLink = function (resp){
    links.push(resp.data);
  }
  this.postLink = function (linkObj){
    return $http.post('/link', linkObj);
  }
})