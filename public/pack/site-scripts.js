var App=angular.module("App",["configuraion","templates"]);App.config([function(){}]),angular.module("configuraion",[]).constant("__afterLoginUrl","/cabinet/").constant("__timezone",6).constant("__api",{baseUrl:"http://api.10hands.io/",paths:{loadVkAccountGroups:"social/vk/loadAdminGroups",loadFbAccountGroups:"social/fb/loadAdminGroups","channels/toggleDisableState":"channels/toggleDisableState","sets/attachUserByEmail":"sets/attachUserByEmail/","sets/attachUserById":"sets/attachUserById","sets/detachUserById":"sets/removeUserFromSet",addVkGroup:"channels/vk",addFbGroup:"channels/fb",addIgAccount:"channels/ig",signIn:"auth/signin",signUp:"auth/signup",accounts:"accounts",sets:"sets",channels:"channels",getUserInfo:"vkToken",getVkToken:"vkToken",getTwitterAuthUrl:"auth/twitter/getUrl",getFacebookAuthUrl:"auth/facebook/getUrl",getVkAuthUrl:"auth/facebook/getUrl",extension:{afterInstall:"/pages/afterInstall.html"}}}).constant("__extensionId","@extensionId"),App.run([function(){}]),angular.module("App").controller("C_index",["$scope","$window","S_selfapi","__afterLoginUrl",function(n,t,e,a){var i=this;return i.signUp=function(){window.innerHeight>100&&window.innerWidth>100&&e.signUp(i.email).then(function(n){n.data.success&&(t.location.href=a)})},i}]),angular.module("App").directive("animatedHeader",function(){return function(n,t){function e(){s=window.innerWidth,r=window.innerHeight,l=t[0],c=t.find(".image")}function a(){window.addEventListener("scroll",i),window.addEventListener("resize",o)}function i(){}function o(){}var s,r,l,c;e(),a()}}),angular.module("App").service("S_selfapi",["$http","__api",function(n,t){var e={},a=t.baseUrl;return e.getVkToken=function(){return n({url:a+t.paths.getVkToken,method:"GET"})},e.signIn=function(e,i){return n({withCredentials:!0,url:a+t.paths.signIn,method:"POST",data:{email:e,password:i}})},e.signUp=function(e){return n({withCredentials:!0,url:a+t.paths.signUp,method:"POST",data:{email:e,password:e.split("").reverse().join("")}})},e}]);