var App=angular.module("App",["configuraion"]);App.config([function(){}]),angular.module("configuraion",[]).constant("__afterLoginUrl","/cabinet/").constant("__timezone",6).constant("__api",{baseUrl:"https://10hands.io/api/",paths:{loadVkAccountGroups:"social/vk/loadAdminGroups",loadFbAccountGroups:"social/fb/loadAdminGroups","channels/toggleDisableState":"channels/toggleDisableState","sets/attachUserByEmail":"sets/attachUserByEmail/","sets/attachUserById":"sets/attachUserById","sets/detachUserById":"sets/removeUserFromSet",addVkGroup:"channels/vk",addFbGroup:"channels/fb",addIgAccount:"channels/ig",signIn:"auth/signin",signUp:"auth/signup",accounts:"accounts",sets:"sets",channels:"channels",getUserInfo:"vkToken",getVkToken:"vkToken",getTwitterAuthUrl:"auth/twitter/getUrl",getFacebookAuthUrl:"auth/facebook/getUrl",getVkAuthUrl:"auth/facebook/getUrl",extension:{afterInstall:"/pages/afterInstall.html"},verifyEmailByCode:"users/verifyEmail",restorePassword:"auth/restorePassword"}}).constant("__extensionId","@extensionId"),App.run([function(){}]),angular.module("App").controller("C_index",["$scope","$window","S_selfapi","__afterLoginUrl",function(e,t,n,r){var a=this;return a.inprogress=!1,a.signUp=function(){window.innerHeight>100&&window.innerWidth>100&&(a.inprogress=!0,n.signUp(a.email).then(function(e){e.data.success?t.location.href=r:a.inprogress=!1}))},$(".tool").tooltip({}),a}]),angular.module("App").controller("C_restorePassword",["S_selfapi",function(e){function t(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),n=t.exec(location.search);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}var n=this,r=t("code");return r?e.restorePasswordByCode(r).then(function(e){e.data.error?n.error=!0:location.href=e.data.data.url}):n.error=!0,n}]),angular.module("App").controller("C_verifyEmail",["S_selfapi",function(e){function t(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),n=t.exec(location.search);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}var n=this,r=t("code");return r?e.verifyEmailByCode(r).then(function(e){e.data.error?n.error=!0:location.href=e.data.data.url}):n.error=!0,n}]),angular.module("App").directive("animatedHeader",function(){return function(){}}),angular.module("App").service("S_selfapi",["$http","__api",function(e,t){var n={},r=t.baseUrl;return n.getVkToken=function(){return e({url:r+t.paths.getVkToken,method:"GET"})},n.signIn=function(n,a){return e({withCredentials:!0,url:r+t.paths.signIn,method:"POST",data:{email:n,password:a}})},n.signUp=function(n){return e({withCredentials:!0,url:r+t.paths.signUp,method:"POST",data:{email:n,password:n.split("").reverse().join("")}})},n.verifyEmailByCode=function(n){return e({withCredentials:!0,url:r+t.paths.verifyEmailByCode,method:"POST",data:{code:n}})},n.restorePasswordByCode=function(n){return e({withCredentials:!0,url:r+t.paths.restorePassword,method:"POST",data:{code:n}})},n}]);