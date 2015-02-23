angular.module("Cabinet",["ui.router","ngSanitize","ngCookies","ngAnimate","ui.bootstrap","templates"]),angular.module("Cabinet").config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(e,t,n,a){a.defaults.withCredentials=!0,a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"],a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=utf8",a.defaults.transformRequest=[function(e){var t=function(e){var n,a,r,o,s,c,i="";for(n in e)if(a=e[n],a instanceof Array)for(c=0;c<a.length;++c)o=a[c],r=n+"["+c+"]",s={},s[r]=o,i+=t(s)+"&";else if(a instanceof Object)for(subName in a)o=a[subName],r=n+"["+subName+"]",s={},s[r]=o,i+=t(s)+"&";else void 0!==a&&null!==a&&(i+=encodeURIComponent(n)+"="+encodeURIComponent(a)+"&");return i.length?i.substr(0,i.length-1):i};return angular.isObject(e)&&"[object File]"!==String(e)?t(e):e}],n.html5Mode(!0).hashPrefix("!"),t.otherwise("/login"),e.state("login",{url:"/login",controller:"CV_login as ctr",templateUrl:"templates/views/login.html"}),e.state("index",{url:"/?successEmail",controller:"CV_index as ctr",templateUrl:"templates/views/index.html"}),e.state("public",{url:"/public/","abstract":!1,templateUrl:"templates/views/public/index.html"}).state("public.sets",{url:"sets/",controller:"CV_public_sets as ctr",templateUrl:"templates/views/public/sets.html"}).state("public.accounts",{url:"accounts/?error&network&success&account",controller:"CV_public_accounts as ctr",templateUrl:"templates/views/public/accounts.html",resolve:{_accounts:["S_selfapi",function(e){return e.getUserAccounts()}]}}).state("public.history",{url:"history/?set_id",controller:"CV_public_history as ctr",templateUrl:"templates/views/public/history.html"}).state("public.team",{url:"team/",controller:"CV_public_team as ctr",templateUrl:"templates/views/public/team.html"}),e.state("analytic",{url:"/analytic/",templateUrl:"templates/views/analytic/index.html"}).state("analytic.sandbox",{url:"sandbox/?branch&branches&from&to&param&param2",controller:"CV_analytic_sandbox as fC",templateUrl:"templates/views/analytic/sandbox.html",reloadOnSearch:!1})}]),angular.module("Cabinet").constant("__afterLoginUrl","/cabinet/").constant("__timezone",6).constant("__api",{baseUrl:"http://api.10hands.io/",paths:{loadVkAccountGroups:"social/vk/loadAdminGroups",loadFbAccountGroups:"social/fb/loadAdminGroups","channels/toggleDisableState":"channels/toggleDisableState","sets/attachUserByEmail":"sets/attachUserByEmail/","sets/attachUserById":"sets/attachUserById","sets/detachUserById":"sets/removeUserFromSet",addVkGroup:"channels/vk",addFbGroup:"channels/fb",addOkGroup:"channels/ok",addIgAccount:"channels/ig",signIn:"auth/signin",signUp:"auth/signup",signOut:"auth/signout",accounts:"accounts",sets:"sets",channels:"channels",getUserInfo:"users/getCurrentUser",getUserState:"users/getState",setUserName:"users/setUserName",setUserCompanyName:"users/setUserCompanyName",setUserPassword:"users/setUserPassword",getVkToken:"vkToken",getTwitterAuthUrl:"auth/twitter/getUrl",getVkAuthUrl:"auth/vk/getUrl",extension:{afterInstall:"/pages/afterInstall.html"},getVkWallPosts:"analytic/getWallPosts",getPostingHistory:"postingHistory"}}).constant("__extensionId","oejjcepegjobphogjdihoahgoekjimkl").value("_timezone",6),angular.module("Cabinet").run(["$state","S_selfapi","S_eventer",function(e,t,n){t.getUserInfo().then(function(t){n.sendEvent("state:userRecieved"),t.data.error?e.go("login"):n.sendEvent("setUserName",t.data.data.name||t.data.data.email)})}]),angular.module("Cabinet").directive("customSelect",function(){return{transclude:!0,scope:{selectId:"=customSelect",closeOnSelect:"=",options:"=",sectionFormat:"=",sectionDefault:"=",optionFormat:"=",optionDisabled:"&",optionActive:"&",onSelect:"&",options:"=",customContent:"="},controller:"CD_customSelect as cSCtr",templateUrl:"templates/directives/customSelect.html",link:function(e,t,n,a,r){var o=e.$parent.$new(),s=e;r(o,function(e,n){n.$close=s.cSCtr.close,t.find('[data-role="custom-content"]').append(e)}),t.find("menu").on("click",function(e){e.stopPropagation()})}}}),angular.module("Cabinet").directive("dateInterval",["$filter","_timezone",function(e,t){return{scope:{start:"=",end:"=",format:"="},templateUrl:"templates/directives/dateInterval.html",link:function(n){var a=n.format||"dd.MM.yyyy";n.$watch(function(){return n.start},function(){n.filteredStart=e("date")(n.start,a,t)}),n.$watch(function(){return n.end},function(){n.filteredEnd=e("date")(n.end,a,t)})}}}]),angular.module("Cabinet").directive("sandboxChart",["S_calculation","_colors",function(){return{scope:{categories:"=",metaInfo:"=",colors:"=",axis:"=",series:"="},link:function(e,t){function n(){var e={chart:{animation:{duration:2500,easing:"easeOutBounce"}},title:{text:""},subtitle:{text:""},plotOptions:{line:{marker:{enabled:!0,radius:3,symbol:"circle"},lineWidth:1}},tooltip:{shared:!0,backgroundColor:"#fff",formatter:function(){},useHTML:!0,borderColor:"transparent",backgroundColor:"transparent",borderRadius:0,shadow:!1},legend:{enabled:!1}};t.find(".chart").highcharts(e).find('text:contains("Highcharts.com")').remove()}e.$watch("series",function(t){t&&n(e.series)})}}}]),angular.module("Cabinet").directive("set",[function(){return{scope:{set:"=",guestAccess:"="},templateUrl:"templates/directives/set.html",link:function(){},controller:["S_selfapi","S_utils",function(e,t){var n=this;n.addNewUser=function(t){t&&""!==t&&(e.attachUserToSetByEmail(n.openedSet.id,t).then(function(e){e.data.success&&n.loadSetInfo(n.openedSet)}),n.newUserEmail="")},n.openSet=function(e,t){n.activeMode!==t&&(n.activeMode=t,delete n.openedSetChannels,n.openedSet=e,n.loadSetInfo(e))},n.addChannel=function(e,a){t.openAddChannelDialog(e,a.id).then(function(){n.openSet(n.openedSet)})},n.toggleChannel=function(t){t.disabled=!t.disabled,e.toggleChannel(t.id,n.openedSet.id,t.disabled).then(function(e){console.log(e.data)})},n.toggleUser=function(t){t.disabled=!t.disabled,t.disabled?e.detachUserFromSet(t.id,n.openedSet.id).then(function(e){console.log(e.data)}):e.attachUserToSet(t.id,n.openedSet.id).then(function(){})},n.loadSetInfo=function(t){e.loadSetFullInfo(t.id).then(function(e){n.openedSetChannels=e.data.data.channels,n.openedSetUsers=e.data.data.users})},n.channelsPlural={0:"нет каналов",one:"{} канал",few:"{} канала",many:"{} каналов",other:"{} канала"},n.usersPlural={0:"нет пользователей",one:"{} пользователь",few:"{} пользователя",many:"{} пользователей",other:"{} пользователя"},n.getChannelsCount=function(e){return e?e.length:0},n.getUsersCount=function(e){return e?e.length:0},n.setIsAvtive=function(e){return n.openedSet.id===e.id},n.getChannelClass=function(e){var t={};return t[e.network]=!0,e.disabled&&(t.disabled=!0),t},n.getUserClass=function(e){var t={};return t[e.network]=!0,e.verified_email&&(t.verified=!0),e.not_confirmed&&(t.notConfirmed=!0),e.disabled&&(t.disabled=!0),t},n.getNetworkIconClass=function(e){var t={};switch(e){case"vk":t["fa-vk"]=!0;break;case"fb":t["fa-facebook"]=!0;break;case"tw":t["fa-twitter"]=!0;break;case"ig":t["fa-instagram"]=!0}return t},n.getChannelLink=function(e,n){return t.getChannelLink(e,n)}}],controllerAs:"ctr"}}]),angular.module("Cabinet").controller("C_cabinet",["$scope","$state","$timeout","S_selfapi","S_vk",function(e,t,n,a){var r=this;return e.$on("showAddExtensionLayer",function(){r.showAddExtensionLayer=!0}),e.$on("setUserName",function(e,t){r.userName=t}),e.$on("state:userRecieved",function(){r.disableLoader=!0}),r.logout=function(){a.signOut().then(function(){t.go("login")})},n(function(){r.disableLoader=!0},2e3),r}]),angular.module("Cabinet").controller("CV_login",["S_selfapi","S_eventer","$state","$timeout",function(e,t,n){var a=this;return a.email=a.password="",a.auth=function(r,o){a.authInProgress=!0,a.error=!1,e.signIn(r,o).then(function(e){a.authInProgress=!1,e.data.success&&(n.go("index"),t.sendEvent("setUserName",e.data.data.name)),e.data.error&&(a.error=!0)})},a}]),angular.module("Cabinet").service("S_enviroment",["$q","$http","__extensionId",function(e,t,n){var a={};return a.extensionIsset=function(){var a=e.defer();return t({withCredentials:!1,url:"chrome-extension://"+n+"/pages/createPost.html",method:"GET"}).then(function(){a.resolve(!0)},function(){a.resolve(!1)}),a.promise},a.callExtensionVkAuth=function(){window.open("chrome-extension://"+n+"/pages/authVk.html","_blank")},a.onPostMessage=function(e){var t=window.addEventListener?"addEventListener":"attachEvent",n=window[t],a="attachEvent"==t?"onmessage":"message";n(a,function(t){var n=t.message?"message":"data",a=t[n];e(t,a)},!1)},a}]),angular.module("Cabinet").service("S_eventer",["$rootScope",function(e){var t={};return t.sendEvent=function(t,n){e.$broadcast(t,n)},t}]),angular.module("Cabinet").service("S_location",["$location",function(e){var t={};return t.setFromTo=function(t,n){t="string"==typeof t?t:moment(t).format("YYYYMMDD"),n="string"==typeof n?n:moment(n).format("YYYYMMDD"),e.search(angular.extend(e.$$search,{from:t,to:n}))},t.setAttr=function(t,n){var a={};a[t]=n,e.search(angular.extend(e.$$search,a))},t}]),angular.module("Cabinet").service("S_mapping",[function(){var e={};return e}]),angular.module("Cabinet").service("S_selfapi",["$http","__api",function(e,t){var n={},a=t.baseUrl;return n.getUserState=function(){return e({url:a+t.paths.getUserState,method:"GET"})},n.setUserName=function(n){return e({url:a+t.paths.setUserName,method:"POST",data:{name:n}})},n.getVkWallPosts=function(n){return e({url:a+t.paths.getVkWallPosts,method:"GET",params:{owner_id:n}})},n.getPostingHistory=function(n){return e({url:a+t.paths.getPostingHistory,method:"GET",params:{set_id:n}})},n.setUserPassword=function(n){return e({url:a+t.paths.setUserPassword,method:"POST",data:n})},n.setUserCompanyName=function(n){return e({url:a+t.paths.setUserCompanyName,method:"POST",data:{company:n}})},n.getUserInfo=function(){return e({url:a+t.paths.getUserInfo,method:"GET"})},n.signOut=function(){return e({url:a+t.paths.signOut,method:"GET"})},n.signIn=function(n,r){return e({withCredentials:!0,url:a+t.paths.signIn,method:"POST",data:{email:n,password:r}})},n.signUp=function(n,r,o){return e({withCredentials:!0,url:a+t.paths.signUp,method:"POST",data:{email:n,password:r,name:o}})},n.addNewSet=function(n){return e({url:a+t.paths.sets,method:"POST",data:{name:n}})},n.toggleChannel=function(n,r,o){return e({url:a+t.paths["channels/toggleDisableState"],method:"GET",params:{set_id:r,id:n,disabled:o}})},n.attachUserToSetByEmail=function(n,r){return e({url:a+t.paths["sets/attachUserByEmail"],method:"GET",params:{id:n,email:r}})},n.attachUserToSet=function(n,r){return e({url:a+t.paths["sets/attachUserById"],method:"GET",params:{id:r,user_id:n}})},n.detachUserFromSet=function(n,r){return e({url:a+t.paths["sets/detachUserById"],method:"GET",params:{id:r,user_id:n}})},n.getTwitterAuthUrl=function(n){return e({url:a+t.paths.getTwitterAuthUrl,method:"GET",params:{set_id:n}})},n.getVkAuthUrl=function(){return e({url:a+t.paths.getVkAuthUrl,method:"GET"})},n.getVkAuthUrl=function(){return e({url:a+t.paths.getVkAuthUrl,method:"GET"})},n.loadSetFullInfo=function(n){return e({url:a+t.paths.sets,method:"GET",params:{id:n}})},n.getUserOwnSets=function(){return e({url:a+t.paths.sets,method:"GET"})},n.getUserAccounts=function(){return e({url:a+t.paths.accounts,method:"GET"})},n.loadVkAccountGroups=function(n){return e({url:a+t.paths.loadVkAccountGroups,method:"GET",params:{account_id:n}})},n.loadFbAccountGroups=function(n){return e({url:a+t.paths.loadFbAccountGroups,method:"GET",params:{account_id:n}})},n.addOkGroup=function(n,r,o){return e({url:a+t.paths.addOkGroup,method:"POST",data:{page_id:n,set_id:r,account_id:o}})},n.addVkGroup=function(n,r,o){return e({url:a+t.paths.addVkGroup,method:"POST",data:{feed_id:n,set_id:r,account_id:o}})},n.addFbGroup=function(n,r,o){return e({url:a+t.paths.addFbGroup,method:"POST",data:{page_id:n,set_id:r,account_id:o}})},n.addIgAccount=function(n,r,o){return e({url:a+t.paths.addIgAccount,method:"POST",data:{username:n,password:r,set_id:o}})},n}]),angular.module("Cabinet").service("S_utils",["$modal",function(e){var t={};return t.openAddChannelDialog=function(t,n){switch(t){case"vk":return e.open({templateUrl:"templates/modals/addChannelVk.html",controller:"CCM_addChannelVk as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"ok":return e.open({templateUrl:"templates/modals/addChannelOk.html",controller:"CCM_addChannelOk as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"ig":return e.open({templateUrl:"templates/modals/addChannelIg.html",controller:"CCM_addChannelIg as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"tw":return e.open({templateUrl:"templates/modals/addChannelTw.html",controller:"CCM_addChannelTw as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"fb":return e.open({templateUrl:"templates/modals/addChannelFb.html",controller:"CCM_addChannelFb as ctr",size:"md",resolve:{setId:function(){return n}}}).result}},t.getChannelLink=function(e,t){switch(e){case"vk":return"https://vk.com/"+t;case"fb":return"https://www.facebook.com/"+t;case"tw":return"https://twitter.com/"+t;case"ig":return"https://instagram.com/"+t}},t}]),angular.module("Cabinet").service("S_vk",["$q","$http","S_utils",function(e,t){var n={};n.default={version:"5.26",language:"ru"};var a=[];return n.request=function(a,r,o){var s=e.defer();return n.getToken().then(function(e){var c="/method/"+a+"?access_token="+e;r.v=r.v||n.default.version,r.lang=r.lang||n.default.language;for(var i in r)"message"===i?c+="&"+i+"="+encodeURIComponent(r[i]):"object"==typeof r[i]&&r[i].length?_.forEach(r[i],function(e){c+="&"+i+"[]="+e}):c+="&"+i+"="+r[i];t.jsonp("https://api.vk.com"+c,{params:{callback:"JSON_CALLBACK"}}).then(function(e){"function"==typeof o?o(e.data):s.resolve(e.data)})}),s.promise},n.setToken=function(e){n.token=e,a.length>0&&angular.forEach(a,function(t){t.resolve(e)})},n.testRequest=function(){var t=e.defer();return n.request("users.get",{},function(e){e.response?t.resolve():t.reject()}),t.promise},n.getToken=function(){var t=e.defer();return n.token?t.resolve(n.token):a.push(t),t.promise},n}]),angular.module("parseVkUrls",[]).filter("parseVkUrls",[function(){return function(e,t){if(e){for(var n=/\[club([0-9]*)\|([^\]]*)\]/g,a=/\[id([0-9]*)\|([^\]]*)\]/g,r=[],o=0;o<e.length;++o)r.push(e.charCodeAt(o));e=emojiParseInText(e);var s=e.autoLink();return s=t?s.replace(n,"<span>$2</span>"):s.replace(n,'<a class="link" href="/public/$1/">$2</a>'),s=s.replace(a,"<span>$2</span>").replace(/\n/g,"<br />")}}}]),angular.module("Cabinet").controller("CV_index",["$scope","$stateParams","S_selfapi","S_eventer","S_enviroment","$timeout",function(e,t,n,a,r){var o=this;return o.extensionIsInstalled=!0,o.saveName=function(e){""!==e&&(o.state.reqName=!1,a.sendEvent("setUserName",e),n.setUserName(e))},o.saveUserCompany=function(e){""!==e&&(o.state.unknownCompany=!1,n.setUserCompanyName(e))},o.changePassword=function(e){""!==e&&n.setUserPassword({password:e}).then(function(e){e.data.success&&(o.state.randomPassword=!1),e.data.error})},o.closeSuccessEmail=function(){o.showSuccessEmail=!1},n.getUserState().then(function(e){o.state=e.data.data,r.extensionIsset().then(function(e){o.extensionIsInstalled=e})}),t.successEmail&&(o.showSuccessEmail=!0),o}]),angular.module("Cabinet").controller("CCM_addChannelFb",["$scope","$state","$location","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s,c,i){var l=this;return l.url="",l.selectedAccount={},l.resolveAndAdd=function(){return l.error="",l.selectedPage.id&&l.selectedAccount.id?void o.addFbGroup(l.selectedPage.id,i,l.selectedAccount.id).then(function(e){return e.data.error?void(l.error=e.data.text):void(e.data.success&&a.close(!0))}):void(l.error="выбери аккаунт и группы")},l.refreshAccounts=function(){o.getUserAccounts().then(function(e){l.accounts=_.filter(e.data.data,function(e){return"fb"===e.network}),l.accounts.length&&(l.selectedAccount=l.accounts[0])})},e.$watch(function(){return l.selectedAccount.id},function(e){e&&o.loadFbAccountGroups(e).then(function(e){l.pages=e.data.data.pages,l.selectedPage=l.pages[0]})}),l.refreshAccounts(),l}]),angular.module("Cabinet").controller("CCM_addChannelIg",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var c=this;return c.url="",c.resolveAndAdd=function(){return c.error="",""===c.username?void(c.error="укажи логин"):""===c.password?void(c.error="укажи пароль"):void a.addIgAccount(c.username,c.password,s).then(function(e){return e.data.error?("enemy"===e.data.code&&(c.error="звезды сказали, что ты не являешься создателем этой группы"),void("already"===e.data.code&&(c.error="группа уже добавлена"))):void(e.data.success&&t.close(!0))})},c}]),angular.module("Cabinet").controller("CCM_addChannelOk",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var c=this;return c.selectedAccount={},c.refreshAccounts=function(){a.getUserAccounts().then(function(e){c.accounts=_.filter(e.data.data,function(e){return"ok"===e.network}),c.accounts.length&&(c.selectedAccount=c.accounts[0])})},c.resolveAndAdd=function(){c.error="",a.addOkGroup(c.gid,s,c.selectedAccount.id).then(function(e){e.data.success?(t.close(),o.sendEvent("trigger:updateChannels")):c.error=e.data.text})},c.refreshAccounts(),c}]),angular.module("Cabinet").controller("CCM_addChannelTw",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var c=this;return a.getTwitterAuthUrl(s).then(function(e){c.authUrl=e.data.data.url}),c.onAuthStart=function(){t.close(),$(window).on("focus",function(){o.sendEvent("trigger:updateChannels"),$(window).off("focus")})},c}]),angular.module("Cabinet").controller("CCM_addChannelVk",["$scope","$state","$location","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s,c,i){var l=this;return l.url="",l.selectedAccount={},l.selectedGroup={},l.resolveAndAdd=function(){return l.error="",l.selectedGroup.id&&l.selectedAccount.id?void o.addVkGroup(l.selectedGroup.id,i,l.selectedAccount.id).then(function(e){return e.data.error?void(l.error=e.data.text):void(e.data.success&&a.close(!0))}):void(l.error="выбери аккаунт и группы")},l.refreshAccounts=function(){o.getUserAccounts().then(function(e){l.accounts=_.filter(e.data.data,function(e){return"vk"===e.network}),l.accounts.length&&(l.selectedAccount=l.accounts[0])})},e.$watch(function(){return l.selectedAccount.id},function(e){e&&o.loadVkAccountGroups(e).then(function(e){l.groups=e.data.data.groups,l.selectedGroup=l.groups[0]})}),l.refreshAccounts(),l}]),angular.module("Cabinet").controller("CD_customSelect",["$timeout","$scope","$interpolate","$sce",function(e,t,n,a){var r=this;return t.length=123,t.$watch("sectionFormat",function(){t.section=a.trustAsHtml(n("<span>"+t.sectionFormat+"</span>")(t))}),r.close=function(){r.opened=!1,$("body").off("click")},r.open=function(){r.opened=!r.opened,r.opened?e(function(){$("body").on("click",function(){t.$apply(function(){r.opened=!1}),$(this).off("click")})}):$("body").off("click")},r.isDisabled=function(e){return t.optionDisabled()?t.optionDisabled()(e,t.selectId):void 0},r.isActive=function(e){return t.optionActive()?t.optionActive()(e,t.selectId):void 0},r.selectOption=function(e,n){e.stopPropagation(),t.selected=n,t.closeOnSelect&&r.open()},r}]),angular.module("Cabinet").controller("CV_public_accounts",["$scope","$state","$filter","$location","S_vk","S_utils","S_enviroment","S_selfapi","S_eventer","__api","_accounts",function(e,t,n,a,r,o,s,c,i,l,u){var d=this;return d.accounts=u.data.data,d.refreshAccounts=function(){c.getUserAccounts().then(function(e){d.accounts=e.data.data})},d.refreshAccounts(),d.getExpiresString=function(e){return 0===e?"доступ открыт":e>0?"доступ до "+n("date")(1e3*e,"dd-MM-yyyy"):void 0},d.getAuthUrl=function(e){return l.baseUrl+"accounts/auth/"+e+"/"},d}]),angular.module("Cabinet").controller("CV_public_history",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.selectedSet={},a.getUserOwnSets().then(function(e){r.sets=[{id:0,name:"Все наборы"}].concat(e.data.data.own),r.selectedSet=r.sets[0],r.loadStat()}),r.loadStat=function(){a.getPostingHistory(r.selectedSet.id).then(function(e){r.history=e.data.data.history})},r}]),angular.module("Cabinet").controller("CV_public_sets",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.openedSet={},r.addNewSet=function(e){e&&""!==e&&(r.newSetName="",a.addNewSet(e).then(function(){r.updateSets(!0)}))},r.updateSets=function(e){e&&a.getUserOwnSets().then(function(e){r.sets=e.data.data})},r.updateSets(!0),e.$on("trigger:updateChannels",function(){r.updateSets(!0)}),r}]),angular.module("Cabinet").controller("CV_public_team",["$scope","S_vk","S_utils","S_selfapi",function(){var e=this;return e}]),angular.module("Cabinet").controller("CV_analytic_sandbox",["$timeout","$scope","$stateParams","$filter","_timezone","S_location","S_selfapi","S_utils",function(e,t,n,a,r,o,s){function c(){var e=(a("date")(i.startDate,"yyyyMMdd",r),a("date")(i.endDate,"yyyyMMdd",r),i.selectedParams[0].name),t=i.selectedParams[1].name,n=e;t&&(n+=","+t),s.getVkWallPosts("-33393308").then(function(t){var n=[],a=[];_.forEach(t.data.data,function(t){var n=t[e];a.push([1e3*t.date,n])}),n.push({name:"vk",data:a}),i.graph={series:n}})}var i={};i.shortState=!0,i.paramsArray=[{description:"Лайки",name:"likes"},{description:"Репосты",name:"reposts"},{description:"Комментарии",name:"comments"},{description:"ER",name:"er"}],i.selectedParams=[_.find(i.paramsArray,function(e){return e.name===(n.param||i.paramsArray[0].name)}),n.param2?_.find(i.paramsArray,function(e){return e.name===n.param2}):{}],i.selectedParams=[{},{}],i.timeIntervals=[{title:"Неделя",id:"week"},{title:"Месяц",id:"month"},{title:"Год",id:"year"}],i.selectedInterval=i.timeIntervals[0],i.selectedBranches=[],t.$watch(function(){return i.startDate.toString()+i.endDate.toString()},function(e){e&&(i.selectIntervalArea&&(i.selectedInterval={}),o.setFromTo(i.startDate,i.endDate),c())}),t.$watch(function(){return i.selectedParams[0].name},function(e){i.paramsArray&&(o.setAttr("param",e),c())}),t.$watch(function(){return i.selectedParams[1].name},function(e){i.paramsArray&&(o.setAttr("param2",e),c())}),i.endDate=n.to?moment(n.to,"YYYYMMDD").toDate():moment().add(-1,"days").toDate(),i.startDate=n.from?moment(n.from,"YYYYMMDD").toDate():moment().add(-7,"days").toDate(),i.branches=[],i.onBranchToggle=function(e,t){i.selectedBranches=t,c()},i.getColorByBranch=function(e){return S_color.getColorByPos(e.pos).light},i.getSelectPlaceholder=function(e){return"branches"!==e?i.selectedParams[e].description?i.selectedParams[e].description:"Выберите параметр":i.selectedBranches.length>0?_.find(i.selectedBranches,{id:0})&&1===i.selectedBranches.length?"Все филиалы":"Филиалов | "+i.selectedBranches.length:"Выберите филиалы"},i.selectParam=function(e,t){i.paramIsActive(e,t)?t?i.selectedParams[t]={}:i.selectedParams[+!t].name?(i.selectedParams[t]=i.selectedParams[+!t],i.selectedParams[+!t]={}):i.selectedParams[t]={}:i.selectedParams[t]=e},i.paramIsActive=function(e,t){return i.selectedParams[t].name==e.name},i.paramAlreadySelected=function(e,t){return i.selectedParams[+!t].name==e.name};var l=!0;return i.intervalClick=function(e){l=!1,e.stopPropagation(),e.preventDefault(),setTimeout(function(){l=!0},100)},i.openSelectIntervalArea=function(){i.selectIntervalArea=!0,setTimeout(function(){$("body").on("click",function(){l&&(t.$apply(function(){i.closeSelectIntervalArea()}),$("body").off("click"))})})},i.closeSelectIntervalArea=function(){i.selectIntervalArea=!1,$("body").off("click")},i.intervalIsActive=function(e){return i.selectedInterval.id===e.id},i.setInterval=function(e){switch(i.endDate=new Date,e.id){case"week":i.startDate=moment().add(-6,"days").toDate();break;case"month":i.startDate=moment().add(-1,"month").toDate();break;case"year":i.startDate=moment().add(-1,"year").toDate()}i.selectedInterval=e},i.toggleState=function(){i.shortState=!i.shortState,i.stateChangeInProgress=!0,e(function(){i.stateChangeAfter=!0,e(function(){i.stateChangeInProgress=!1,e(function(){$(window).resize(),e(function(){i.stateChangeAfter=!1},100)},100)},100)},900)},i}]);