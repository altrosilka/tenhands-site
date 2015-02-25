var App=angular.module("App",["configuraion"]);App.config([function(){}]),angular.module("configuraion",[]).constant("__afterLoginUrl","/cabinet/").constant("__timezone",6).constant("__api",{baseUrl:"http://api.10hands.io/",paths:{loadVkAccountGroups:"social/vk/loadAdminGroups",loadFbAccountGroups:"social/fb/loadAdminGroups","channels/toggleDisableState":"channels/toggleDisableState","sets/attachUserByEmail":"sets/attachUserByEmail/","sets/attachUserById":"sets/attachUserById","sets/detachUserById":"sets/removeUserFromSet",addVkGroup:"channels/vk",addFbGroup:"channels/fb",addIgAccount:"channels/ig",signIn:"auth/signin",signUp:"auth/signup",accounts:"accounts",sets:"sets",channels:"channels",getUserInfo:"vkToken",getVkToken:"vkToken",getTwitterAuthUrl:"auth/twitter/getUrl",getFacebookAuthUrl:"auth/facebook/getUrl",getVkAuthUrl:"auth/facebook/getUrl",extension:{afterInstall:"/pages/afterInstall.html"},verifyEmailByCode:"users/verifyEmail"}}).constant("__extensionId","@extensionId"),App.run([function(){}]),angular.module("App").directive("animatedHeader",function(){return function(){}}),angular.module("App").controller("C_index",["$scope","$window","S_selfapi","__afterLoginUrl",function(e,n,t,a){var r=this;return r.inprogress=!1,r.signUp=function(){window.innerHeight>100&&window.innerWidth>100&&(r.inprogress=!0,t.signUp(r.email).then(function(e){e.data.success?n.location.href=a:r.inprogress=!1}))},r}]),angular.module("App").controller("C_verifyEmail",["S_selfapi",function(e){function n(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)"),t=n.exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}var t=this,a=n("code");return a?e.verifyEmailByCode(a).then(function(e){e.data.error?t.error=!0:location.href=e.data.data.url}):t.error=!0,t}]),angular.module("App").service("S_selfapi",["$http","__api",function(e,n){var t={},a=n.baseUrl;return t.getVkToken=function(){return e({url:a+n.paths.getVkToken,method:"GET"})},t.signIn=function(t,r){return e({withCredentials:!0,url:a+n.paths.signIn,method:"POST",data:{email:t,password:r}})},t.signUp=function(t){return e({withCredentials:!0,url:a+n.paths.signUp,method:"POST",data:{email:t,password:t.split("").reverse().join("")}})},t.verifyEmailByCode=function(t){return e({withCredentials:!0,url:a+n.paths.verifyEmailByCode,method:"POST",data:{code:t}})},t}]);