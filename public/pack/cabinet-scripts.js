angular.module("Cabinet",["ui.router","ui.select","ngSanitize","ngCookies","ngAnimate","ui.bootstrap","templates","LocalStorageModule"]),angular.module("Cabinet").config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(e,t,n,a){a.defaults.withCredentials=!0,a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"],a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=utf8",a.defaults.transformRequest=[function(e){var t=function(e){var n,a,r,o,s,i,c="";for(n in e)if(a=e[n],a instanceof Array)for(i=0;i<a.length;++i)o=a[i],r=n+"["+i+"]",s={},s[r]=o,c+=t(s)+"&";else if(a instanceof Object)for(subName in a)o=a[subName],r=n+"["+subName+"]",s={},s[r]=o,c+=t(s)+"&";else void 0!==a&&null!==a&&(c+=encodeURIComponent(n)+"="+encodeURIComponent(a)+"&");return c.length?c.substr(0,c.length-1):c};return angular.isObject(e)&&"[object File]"!==String(e)?t(e):e}],n.html5Mode(!0).hashPrefix("!"),t.otherwise("/login"),e.state("login",{url:"/login",controller:"CV_login as ctr",templateUrl:"templates/views/login.html"}),e.state("index",{url:"/?successEmail&successRestore",controller:"CV_index as ctr",templateUrl:"templates/views/index.html"}),e.state("public",{url:"/public/","abstract":!1,templateUrl:"templates/views/public/index.html"}).state("public.sets",{url:"sets/",controller:"CV_public_sets as ctr",templateUrl:"templates/views/public/sets.html"}).state("public.accounts",{url:"accounts/?error&network&success&account",controller:"CV_public_accounts as ctr",templateUrl:"templates/views/public/accounts.html",resolve:{_accounts:["S_selfapi",function(e){return e.getUserAccounts()}]}}).state("public.history",{url:"history/?set_id",controller:"CV_public_history as ctr",templateUrl:"templates/views/public/history.html"}).state("public.team",{url:"team/",controller:"CV_public_team as ctr",templateUrl:"templates/views/public/team.html"}).state("public.table",{url:"table/",controller:"CV_public_team as ctr",templateUrl:"templates/views/public/table.html"}),e.state("analytic",{url:"/analytic/",templateUrl:"templates/views/analytic/index.html"}).state("analytic.sandbox",{url:"sandbox/?branch&branches&from&to&param&param2",controller:"CV_analytic_sandbox as fC",templateUrl:"templates/views/analytic/sandbox.html",reloadOnSearch:!1})}]),angular.module("Cabinet").constant("__afterLoginUrl","/cabinet/").constant("__timezone",6).constant("__api",{baseUrl:"http://10hands.io/api/",paths:{loadVkAccountGroups:"social/vk/loadAdminGroups",loadFbAccountGroups:"social/fb/loadAdminGroups","channels/toggleDisableState":"channels/toggleDisableState","sets/attachUserByEmail":"sets/attachUserByEmail/","sets/attachUserById":"sets/attachUserById","sets/detachUserById":"sets/removeUserFromSet",addVkGroup:"channels/vk",addFbGroup:"channels/fb",addOkGroup:"channels/ok",addIgAccount:"channels/ig",signIn:"auth/signin",signUp:"auth/signup",signOut:"auth/signout",accounts:"accounts",sets:"sets",channels:"channels",getUserInfo:"users/getCurrentUser",getUserState:"users/getState",setUserName:"users/setUserName",setUserCompanyName:"users/setUserCompanyName",setUserPassword:"users/setUserPassword",getVkToken:"vkToken",getTwitterAuthUrl:"auth/twitter/getUrl",getVkAuthUrl:"auth/vk/getUrl",extension:{afterInstall:"/pages/afterInstall.html"},getVkWallPosts:"analytic/getWallPosts",getPostingHistory:"postingHistory",getUserSetsTeam:"sets/getTeam",restorePassword:"auth/restorePassword"}}).constant("__extensionId","oejjcepegjobphogjdihoahgoekjimkl").value("_timezone",6),angular.module("Cabinet").run(["$state","S_selfapi","S_eventer",function(e,t,n){t.getUserInfo().then(function(t){n.sendEvent("state:userRecieved"),t.data.error?e.go("login"):n.sendEvent("setUserName",t.data.data.name||t.data.data.email)})}]),angular.module("Cabinet").controller("C_cabinet",["$scope","$state","$timeout","S_selfapi","S_vk",function(e,t,n,a){var r=this;return e.$on("showAddExtensionLayer",function(){r.showAddExtensionLayer=!0}),e.$on("setUserName",function(e,t){r.userName=t}),e.$on("state:userRecieved",function(){r.disableLoader=!0}),r.logout=function(){a.signOut().then(function(){t.go("login")})},r.getMainState=function(){return t.current.name.split(".")[0]},n(function(){r.disableLoader=!0},2e3),r}]),angular.module("Cabinet").controller("CV_login",["S_selfapi","S_eventer","$state","$timeout",function(e,t,n){var a=this;return a.email=a.password="",a.auth=function(r,o){a.authInProgress||(a.authInProgress=!0,a.error=!1,e.signIn(r,o).then(function(e){a.authInProgress=!1,e.data.success&&(n.go("index"),t.sendEvent("setUserName",e.data.data.name)),e.data.error&&(a.error=!0)}))},a.toggleRestorePassword=function(){a.restoreMode=!a.restoreMode},a.restore=function(t){a.authInProgress||(a.authInProgress=!0,a.error=!1,e.restorePassword(t).then(function(e){a.authInProgress=!1,console.log(e.data),e.data.success&&(a.successRestore=!0),e.data.error&&(a.error=!0)}))},a}]),angular.module("parseVkUrls",[]).filter("parseVkUrls",[function(){return function(e,t){if(e){for(var n=/\[club([0-9]*)\|([^\]]*)\]/g,a=/\[id([0-9]*)\|([^\]]*)\]/g,r=[],o=0;o<e.length;++o)r.push(e.charCodeAt(o));e=emojiParseInText(e);var s=e.autoLink();return s=t?s.replace(n,"<span>$2</span>"):s.replace(n,'<a class="link" href="/public/$1/">$2</a>'),s=s.replace(a,"<span>$2</span>").replace(/\n/g,"<br />")}}}]),angular.module("Cabinet").filter("propsFilter",function(){return function(e,t){var n=[];return angular.isArray(e)?e.forEach(function(e){for(var a=!1,r=Object.keys(t),o=0;o<r.length;o++){var s=r[o],i=t[s].toLowerCase();if(-1!==e[s].toString().toLowerCase().indexOf(i)){a=!0;break}}a&&n.push(e)}):n=e,n}}),angular.module("Cabinet").directive("customSelect",function(){return{transclude:!0,scope:{selectId:"=customSelect",closeOnSelect:"=",options:"=",sectionFormat:"=",sectionDefault:"=",optionFormat:"=",optionDisabled:"&",optionActive:"&",onSelect:"&",options:"=",customContent:"="},controller:"CD_customSelect as cSCtr",templateUrl:"templates/directives/customSelect.html",link:function(e,t,n,a,r){var o=e.$parent.$new(),s=e;r(o,function(e,n){n.$close=s.cSCtr.close,t.find('[data-role="custom-content"]').append(e)}),t.find("menu").on("click",function(e){e.stopPropagation()})}}}),angular.module("Cabinet").directive("dateInterval",["$filter","_timezone",function(e,t){return{scope:{start:"=",end:"=",format:"="},templateUrl:"templates/directives/dateInterval.html",link:function(n){var a=n.format||"dd.MM.yyyy";n.$watch(function(){return n.start},function(){n.filteredStart=e("date")(n.start,a,t)}),n.$watch(function(){return n.end},function(){n.filteredEnd=e("date")(n.end,a,t)})}}}]),angular.module("Cabinet").directive("member",[function(){return{scope:{member:"=",guestAccess:"="},templateUrl:"templates/directives/member.html",link:function(){},controller:["$scope","S_selfapi","S_utils",function(e,t){var n=this,a=e.member.sets_ids?e.member.sets_ids.length:0;n.getName=function(){return e.member.name?e.member.name+" / "+e.member.email:e.member.email},n.setsPlural={0:"нет наборов",one:"{} набор",few:"{} набора",many:"{} наборов",other:"{} набора"},n.getSetsCount=function(){return a},n.getSetClass=function(e){var t={};return e.disabled&&(t.disabled=!0),t},n.open=function(){n.activeMode=!0,t.loadSetFullInfo(e.member.sets_ids.join(",")).then(function(e){n.sets=e.data.data})},n.toggleUserFromSet=function(n){n.disabled=!n.disabled,n.disabled?(a-=1,t.detachUserFromSet(e.member.id,n.id).then(function(e){console.log(e.data)})):(a+=1,t.attachUserToSet(e.member.id,n.id).then(function(){}))}}],controllerAs:"ctr"}}]),angular.module("Cabinet").directive("notifyPanel",["notifyPanel_service",function(e){return{scope:{id:"@notifyPanel"},link:function(t,n){e.checkId(t.id)||n.show().prepend('<span class="closer ion-close-round" data-close-notify></span>').find("[data-close-notify]").on("click",function(){n.remove(),e.trackId(t.id)})}}}]).service("notifyPanel_service",["localStorageService",function(e){var t={},n="notifyPanel_ids";return t.checkId=function(t){var a=e.get(n)||{};return a[t]},t.trackId=function(t){var a=e.get(n)||{};a[t]=1,e.set(n,a)},t}]),angular.module("Cabinet").directive("sandboxChart",["S_calculation","_colors",function(){return{scope:{categories:"=",metaInfo:"=",colors:"=",axis:"=",series:"="},link:function(e,t){function n(){var e={chart:{animation:{duration:2500,easing:"easeOutBounce"}},title:{text:""},subtitle:{text:""},plotOptions:{line:{marker:{enabled:!0,radius:3,symbol:"circle"},lineWidth:1}},tooltip:{shared:!0,backgroundColor:"#fff",formatter:function(){},useHTML:!0,borderColor:"transparent",backgroundColor:"transparent",borderRadius:0,shadow:!1},legend:{enabled:!1}};t.find(".chart").highcharts(e).find('text:contains("Highcharts.com")').remove()}e.$watch("series",function(t){t&&n(e.series)})}}}]),angular.module("Cabinet").directive("set",[function(){return{scope:{set:"=",guestAccess:"="},templateUrl:"templates/directives/set.html",link:function(){},controller:["$scope","S_selfapi","S_utils",function(e,t,n){var a=this;a.addNewUser=function(e){e&&""!==e&&(t.attachUserToSetByEmail(a.openedSet.id,e).then(function(e){e.data.success&&a.loadSetInfo(a.openedSet)}),a.newUserEmail="")},a.openSet=function(e,t){a.activeMode!==t&&(a.activeMode=t,delete a.openedSetChannels,a.openedSet=e,a.loadSetInfo(e))},a.setNewName=function(n){return a.errorInName=!1,n.length<3?void(a.errorInName=!0):void t.editSetProperty(e.set.id,"name",n).then(function(){})},a.onNameKeyup=function(e){a.errorInName=!1,e.length<3&&(a.errorInName=!0)},a.addChannel=function(e,t){n.openAddChannelDialog(e,t.id).then(function(){a.loadSetInfo(a.openedSet)})},a.toggleChannel=function(e){e.disabled=!e.disabled,t.toggleChannel(e.id,a.openedSet.id,e.disabled).then(function(e){console.log(e.data)})},a.toggleUser=function(e){e.disabled=!e.disabled,e.disabled?t.detachUserFromSet(e.id,a.openedSet.id).then(function(e){console.log(e.data)}):t.attachUserToSet(e.id,a.openedSet.id).then(function(){})},a.loadSetInfo=function(e){t.loadSetFullInfo(e.id).then(function(e){a.openedSetChannels=e.data.data[0].channels,a.openedSetUsers=e.data.data[0].users})},a.channelsPlural={0:"нет каналов",one:"{} канал",few:"{} канала",many:"{} каналов",other:"{} канала"},a.usersPlural={0:"нет пользователей",one:"{} пользователь",few:"{} пользователя",many:"{} пользователей",other:"{} пользователя"},a.getChannelsCount=function(e){return e?e.length:0},a.getUsersCount=function(e){return e?e.length:0},a.setIsAvtive=function(e){return a.openedSet.id===e.id},a.getChannelClass=function(e){var t={};return t[e.network]=!0,e.disabled&&(t.disabled=!0),t},a.getUserClass=function(e){var t={};return t[e.network]=!0,e.verified_email&&(t.verified=!0),e.not_confirmed&&(t.notConfirmed=!0),e.disabled&&(t.disabled=!0),t},a.getNetworkIconClass=function(e){var t={};switch(e){case"vk":t["fa-vk"]=!0;break;case"fb":t["fa-facebook"]=!0;break;case"tw":t["fa-twitter"]=!0;break;case"ig":t["fa-instagram"]=!0}return t},a.getChannelLink=function(e,t){return n.getChannelLink(e,t)}}],controllerAs:"ctr"}}]),angular.module("Cabinet").service("S_enviroment",["$q","$http","__extensionId",function(e,t,n){var a={};return a.extensionIsset=function(){var a=e.defer();return t({withCredentials:!1,url:"chrome-extension://"+n+"/pages/createPost.html",method:"GET"}).then(function(){a.resolve(!0)},function(){a.resolve(!1)}),a.promise},a.callExtensionVkAuth=function(){window.open("chrome-extension://"+n+"/pages/authVk.html","_blank")},a.onPostMessage=function(e){var t=window.addEventListener?"addEventListener":"attachEvent",n=window[t],a="attachEvent"==t?"onmessage":"message";n(a,function(t){var n=t.message?"message":"data",a=t[n];e(t,a)},!1)},a}]),angular.module("Cabinet").service("S_eventer",["$rootScope",function(e){var t={};return t.sendEvent=function(t,n){e.$broadcast(t,n)},t}]),angular.module("Cabinet").service("S_location",["$location",function(e){var t={};return t.setFromTo=function(t,n){t="string"==typeof t?t:moment(t).format("YYYYMMDD"),n="string"==typeof n?n:moment(n).format("YYYYMMDD"),e.search(angular.extend(e.$$search,{from:t,to:n}))},t.setAttr=function(t,n){var a={};a[t]=n,e.search(angular.extend(e.$$search,a))},t}]),angular.module("Cabinet").service("S_mapping",[function(){var e={};return e}]),angular.module("Cabinet").service("S_selfapi",["$http","__api",function(e,t){var n={},a=t.baseUrl;return n.getUserState=function(){return e({url:a+t.paths.getUserState,method:"GET"})},n.setUserName=function(n){return e({url:a+t.paths.setUserName,method:"POST",data:{name:n}})},n.getVkWallPosts=function(n){return e({url:a+t.paths.getVkWallPosts,method:"GET",params:{owner_id:n}})},n.getPostingHistory=function(n){return e({url:a+t.paths.getPostingHistory,method:"GET",params:{set_id:n}})},n.setUserPassword=function(n){return e({url:a+t.paths.setUserPassword,method:"POST",data:n})},n.setUserCompanyName=function(n){return e({url:a+t.paths.setUserCompanyName,method:"POST",data:{company:n}})},n.getUserInfo=function(){return e({url:a+t.paths.getUserInfo,method:"GET"})},n.signOut=function(){return e({url:a+t.paths.signOut,method:"GET"})},n.signIn=function(n,r){return e({withCredentials:!0,url:a+t.paths.signIn,method:"POST",data:{email:n,password:r}})},n.signUp=function(n,r,o){return e({withCredentials:!0,url:a+t.paths.signUp,method:"POST",data:{email:n,password:r,name:o}})},n.addNewSet=function(n){return e({url:a+t.paths.sets,method:"POST",data:{name:n}})},n.editSetProperty=function(n,r,o){var s={id:n};return s[r]=o,e({url:a+t.paths.sets,method:"POST",data:s})},n.toggleChannel=function(n,r,o){return e({url:a+t.paths["channels/toggleDisableState"],method:"GET",params:{set_id:r,id:n,disabled:o}})},n.attachUserToSetByEmail=function(n,r){return e({url:a+t.paths["sets/attachUserByEmail"],method:"GET",params:{id:n,email:r}})},n.attachUserToSet=function(n,r){return e({url:a+t.paths["sets/attachUserById"],method:"GET",params:{id:r,user_id:n}})},n.detachUserFromSet=function(n,r){return e({url:a+t.paths["sets/detachUserById"],method:"GET",params:{id:r,user_id:n}})},n.getTwitterAuthUrl=function(n){return e({url:a+t.paths.getTwitterAuthUrl,method:"GET",params:{set_id:n}})},n.getVkAuthUrl=function(){return e({url:a+t.paths.getVkAuthUrl,method:"GET"})},n.getVkAuthUrl=function(){return e({url:a+t.paths.getVkAuthUrl,method:"GET"})},n.loadSetFullInfo=function(n){return e({url:a+t.paths.sets,method:"GET",params:{id:n}})},n.getUserSets=function(){return e({url:a+t.paths.sets,method:"GET"})},n.getUserAccounts=function(){return e({url:a+t.paths.accounts,method:"GET"})},n.loadVkAccountGroups=function(n){return e({url:a+t.paths.loadVkAccountGroups,method:"GET",params:{account_id:n}})},n.loadFbAccountGroups=function(n){return e({url:a+t.paths.loadFbAccountGroups,method:"GET",params:{account_id:n}})},n.addOkGroup=function(n,r,o){return e({url:a+t.paths.addOkGroup,method:"POST",data:{page_id:n,set_id:r,account_id:o}})},n.addVkGroup=function(n,r,o){return e({url:a+t.paths.addVkGroup,method:"POST",data:{feed_id:n,set_id:r,account_id:o}})},n.addFbGroup=function(n,r,o){return e({url:a+t.paths.addFbGroup,method:"POST",data:{page_id:n,set_id:r,account_id:o}})},n.addIgAccount=function(n,r,o){return e({url:a+t.paths.addIgAccount,method:"POST",data:{username:n,password:r,set_id:o}})},n.restorePassword=function(n){return e({url:a+t.paths.restorePassword,method:"POST",data:{email:n}})},n.getUserSetsTeam=function(){return e({url:a+t.paths.getUserSetsTeam,method:"GET"})},n}]),angular.module("Cabinet").service("S_utils",["$modal",function(e){var t={};return t.openAddChannelDialog=function(t,n){switch(t){case"vk":return e.open({templateUrl:"templates/modals/addChannelVk.html",controller:"CCM_addChannelVk as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"ok":return e.open({templateUrl:"templates/modals/addChannelOk.html",controller:"CCM_addChannelOk as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"ig":return e.open({templateUrl:"templates/modals/addChannelIg.html",controller:"CCM_addChannelIg as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"tw":return e.open({templateUrl:"templates/modals/addChannelTw.html",controller:"CCM_addChannelTw as ctr",size:"md",resolve:{setId:function(){return n}}}).result;case"fb":return e.open({templateUrl:"templates/modals/addChannelFb.html",controller:"CCM_addChannelFb as ctr",size:"md",resolve:{setId:function(){return n}}}).result}},t.getChannelLink=function(e,t){switch(e){case"vk":return"https://vk.com/"+t;case"fb":return"https://www.facebook.com/"+t;case"tw":return"https://twitter.com/"+t;case"ig":return"https://instagram.com/"+t}},t}]),angular.module("Cabinet").service("S_vk",["$q","$http","S_utils",function(e,t){var n={};n.default={version:"5.26",language:"ru"};var a=[];return n.request=function(a,r,o){var s=e.defer();return n.getToken().then(function(e){var i="/method/"+a+"?access_token="+e;r.v=r.v||n.default.version,r.lang=r.lang||n.default.language;for(var c in r)"message"===c?i+="&"+c+"="+encodeURIComponent(r[c]):"object"==typeof r[c]&&r[c].length?_.forEach(r[c],function(e){i+="&"+c+"[]="+e}):i+="&"+c+"="+r[c];t.jsonp("https://api.vk.com"+i,{params:{callback:"JSON_CALLBACK"}}).then(function(e){"function"==typeof o?o(e.data):s.resolve(e.data)})}),s.promise},n.setToken=function(e){n.token=e,a.length>0&&angular.forEach(a,function(t){t.resolve(e)})},n.testRequest=function(){var t=e.defer();return n.request("users.get",{},function(e){e.response?t.resolve():t.reject()}),t.promise},n.getToken=function(){var t=e.defer();return n.token?t.resolve(n.token):a.push(t),t.promise},n}]),angular.module("Cabinet").controller("CD_customSelect",["$timeout","$scope","$interpolate","$sce",function(e,t,n,a){var r=this;return t.length=123,t.$watch("sectionFormat",function(){t.section=a.trustAsHtml(n("<span>"+t.sectionFormat+"</span>")(t))}),r.close=function(){r.opened=!1,$("body").off("click")},r.open=function(){r.opened=!r.opened,r.opened?e(function(){$("body").on("click",function(){t.$apply(function(){r.opened=!1}),$(this).off("click")})}):$("body").off("click")},r.isDisabled=function(e){return t.optionDisabled()?t.optionDisabled()(e,t.selectId):void 0},r.isActive=function(e){return t.optionActive()?t.optionActive()(e,t.selectId):void 0},r.selectOption=function(e,n){e.stopPropagation(),t.selected=n,t.closeOnSelect&&r.open()},r}]),angular.module("Cabinet").controller("CCM_addChannelFb",["$scope","$state","$location","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s,i,c){var l=this;return l.url="",l.selectedAccount={},l.resolveAndAdd=function(){return l.error="",l.selectedPage.id&&l.selectedAccount.id?void o.addFbGroup(l.selectedPage.id,c,l.selectedAccount.id).then(function(e){return e.data.error?void(l.error=e.data.text):void(e.data.success&&a.close(!0))}):void(l.error="выбери аккаунт и группы")},l.refreshAccounts=function(){o.getUserAccounts().then(function(e){l.accounts=_.filter(e.data.data,function(e){return"fb"===e.network}),l.accounts.length&&(l.selectedAccount=l.accounts[0])})},e.$watch(function(){return l.selectedAccount.id},function(e){e&&o.loadFbAccountGroups(e).then(function(e){l.pages=e.data.data.pages,l.selectedPage=l.pages[0]})}),l.refreshAccounts(),l}]),angular.module("Cabinet").controller("CCM_addChannelIg",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var i=this;return i.url="",i.resolveAndAdd=function(){return i.error="",""===i.username?void(i.error="укажи логин"):""===i.password?void(i.error="укажи пароль"):void a.addIgAccount(i.username,i.password,s).then(function(e){return e.data.error?("enemy"===e.data.code&&(i.error="звезды сказали, что ты не являешься создателем этой группы"),void("already"===e.data.code&&(i.error="группа уже добавлена"))):void(e.data.success&&t.close(!0))})},i}]),angular.module("Cabinet").controller("CCM_addChannelOk",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var i=this;return i.selectedAccount={},i.refreshAccounts=function(){a.getUserAccounts().then(function(e){i.accounts=_.filter(e.data.data,function(e){return"ok"===e.network}),i.accounts.length&&(i.selectedAccount=i.accounts[0])})},i.resolveAndAdd=function(){i.error="",a.addOkGroup(i.gid,s,i.selectedAccount.id).then(function(e){e.data.success?(t.close(),o.sendEvent("trigger:updateChannels")):i.error=e.data.text})},i.refreshAccounts(),i}]),angular.module("Cabinet").controller("CCM_addChannelTw",["$scope","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s){var i=this;return a.getTwitterAuthUrl(s).then(function(e){i.authUrl=e.data.data.url}),i.onAuthStart=function(){t.close(),$(window).on("focus",function(){o.sendEvent("trigger:updateChannels"),$(window).off("focus")})},i}]),angular.module("Cabinet").controller("CCM_addChannelVk",["$scope","$state","$location","$modalInstance","S_vk","S_selfapi","S_enviroment","S_eventer","setId",function(e,t,n,a,r,o,s,i,c){var l=this;return l.url="",l.selectedAccount={},l.selectedGroup={},l.resolveAndAdd=function(){return l.error="",l.selectedGroup.id&&l.selectedAccount.id?void o.addVkGroup(l.selectedGroup.id,c,l.selectedAccount.id).then(function(e){return e.data.error?void(l.error=e.data.text):void(e.data.success&&a.close(!0))}):void(l.error="выбери аккаунт и группы")},l.refreshAccounts=function(){o.getUserAccounts().then(function(e){l.accounts=_.filter(e.data.data,function(e){return"vk"===e.network}),l.accounts.length&&(l.selectedAccount=l.accounts[0])})},e.$watch(function(){return l.selectedAccount.id},function(e){e&&o.loadVkAccountGroups(e).then(function(e){l.groups=e.data.data.groups,l.selectedGroup=l.groups[0]})}),l.refreshAccounts(),l}]),angular.module("Cabinet").controller("CV_index",["$scope","$stateParams","S_selfapi","S_eventer","S_enviroment","$timeout",function(e,t,n,a,r){function o(){r.extensionIsset().then(function(e){s.extensionIsInstalled=e})}var s=this;return s.extensionIsInstalled=!0,s.onGoingToStore=function(){$(window).on("focus",function(){o(),$(window).off("focus")})},s.saveName=function(e){""!==e&&(s.state.reqName=!1,a.sendEvent("setUserName",e),n.setUserName(e))},s.saveUserCompany=function(e){""!==e&&(s.state.unknownCompany=!1,n.setUserCompanyName(e))},s.changePassword=function(e){""!==e&&n.setUserPassword({password:e}).then(function(e){e.data.success&&(s.state.randomPassword=!1),e.data.error})},s.closeNotify=function(){s.showNotify=!1},n.getUserState().then(function(e){s.state=e.data.data}),t.successEmail&&(s.showNotify=!0,s.notifyText="E-Mail адрес успешно подтвержден!"),t.successRestore&&(s.showNotify=!0,s.notifyText="Ваш пароль сброшен"),o(),s}]),angular.module("Cabinet").controller("CV_analytic_sandbox",["$timeout","$scope","$stateParams","$filter","_timezone","S_location","S_selfapi","S_utils",function(e,t,n,a,r,o,s){function i(){var e=(a("date")(c.startDate,"yyyyMMdd",r),a("date")(c.endDate,"yyyyMMdd",r),c.selectedParams[0].name),t=c.selectedParams[1].name,n=e;t&&(n+=","+t),s.getVkWallPosts("-33393308").then(function(t){var n=[],a=[];_.forEach(t.data.data,function(t){var n=t[e];a.push([1e3*t.date,n])}),n.push({name:"vk",data:a}),c.graph={series:n}})}var c={};c.shortState=!0,c.paramsArray=[{description:"Лайки",name:"likes"},{description:"Репосты",name:"reposts"},{description:"Комментарии",name:"comments"},{description:"ER",name:"er"}],c.selectedParams=[_.find(c.paramsArray,function(e){return e.name===(n.param||c.paramsArray[0].name)}),n.param2?_.find(c.paramsArray,function(e){return e.name===n.param2}):{}],c.selectedParams=[{},{}],c.timeIntervals=[{title:"Неделя",id:"week"},{title:"Месяц",id:"month"},{title:"Год",id:"year"}],c.selectedInterval=c.timeIntervals[0],c.selectedBranches=[],t.$watch(function(){return c.startDate.toString()+c.endDate.toString()},function(e){e&&(c.selectIntervalArea&&(c.selectedInterval={}),o.setFromTo(c.startDate,c.endDate),i())}),t.$watch(function(){return c.selectedParams[0].name},function(e){c.paramsArray&&(o.setAttr("param",e),i())}),t.$watch(function(){return c.selectedParams[1].name},function(e){c.paramsArray&&(o.setAttr("param2",e),i())}),c.endDate=n.to?moment(n.to,"YYYYMMDD").toDate():moment().add(-1,"days").toDate(),c.startDate=n.from?moment(n.from,"YYYYMMDD").toDate():moment().add(-7,"days").toDate(),c.branches=[],c.onBranchToggle=function(e,t){c.selectedBranches=t,i()},c.getColorByBranch=function(e){return S_color.getColorByPos(e.pos).light},c.getSelectPlaceholder=function(e){return"branches"!==e?c.selectedParams[e].description?c.selectedParams[e].description:"Выберите параметр":c.selectedBranches.length>0?_.find(c.selectedBranches,{id:0})&&1===c.selectedBranches.length?"Все филиалы":"Филиалов | "+c.selectedBranches.length:"Выберите филиалы"},c.selectParam=function(e,t){c.paramIsActive(e,t)?t?c.selectedParams[t]={}:c.selectedParams[+!t].name?(c.selectedParams[t]=c.selectedParams[+!t],c.selectedParams[+!t]={}):c.selectedParams[t]={}:c.selectedParams[t]=e},c.paramIsActive=function(e,t){return c.selectedParams[t].name==e.name},c.paramAlreadySelected=function(e,t){return c.selectedParams[+!t].name==e.name};var l=!0;return c.intervalClick=function(e){l=!1,e.stopPropagation(),e.preventDefault(),setTimeout(function(){l=!0},100)},c.openSelectIntervalArea=function(){c.selectIntervalArea=!0,setTimeout(function(){$("body").on("click",function(){l&&(t.$apply(function(){c.closeSelectIntervalArea()}),$("body").off("click"))})})},c.closeSelectIntervalArea=function(){c.selectIntervalArea=!1,$("body").off("click")},c.intervalIsActive=function(e){return c.selectedInterval.id===e.id},c.setInterval=function(e){switch(c.endDate=new Date,e.id){case"week":c.startDate=moment().add(-6,"days").toDate();break;case"month":c.startDate=moment().add(-1,"month").toDate();break;case"year":c.startDate=moment().add(-1,"year").toDate()}c.selectedInterval=e},c.toggleState=function(){c.shortState=!c.shortState,c.stateChangeInProgress=!0,e(function(){c.stateChangeAfter=!0,e(function(){c.stateChangeInProgress=!1,e(function(){$(window).resize(),e(function(){c.stateChangeAfter=!1},100)},100)},100)},900)},c}]),angular.module("Cabinet").controller("CV_public_accounts",["$scope","$state","$filter","$location","S_vk","S_utils","S_enviroment","S_selfapi","S_eventer","__api","_accounts",function(e,t,n,a,r,o,s,i,c,l,u){var d=this;return d.accounts=u.data.data,d.refreshAccounts=function(){i.getUserAccounts().then(function(e){d.accounts=e.data.data})},d.refreshAccounts(),d.getExpiresString=function(e){return 0===e?"доступ открыт":e>0?"доступ до "+n("date")(1e3*e,"dd-MM-yyyy"):void 0},d.getAuthUrl=function(e){return l.baseUrl+"accounts/auth/"+e+"/"},d}]),angular.module("Cabinet").controller("CV_public_history",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.selectedSet={},a.getUserOwnSets().then(function(e){r.sets=[{id:0,name:"Все наборы"}].concat(e.data.data.own),r.selectedSet=r.sets[0],r.loadStat()}),r.loadStat=function(){a.getPostingHistory(r.selectedSet.id).then(function(e){r.history=e.data.data.history})},r}]),angular.module("Cabinet").controller("CV_public_sets",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.openedSet={},r.addNewSet=function(e){e&&""!==e&&(r.newSetName="",a.addNewSet(e).then(function(){r.updateSets()}))},r.updateSets=function(){a.getUserSets().then(function(e){r.sets=e.data.data})},r.updateSets(),r}]),angular.module("Cabinet").controller("CV_public_table",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.selectedSets=[],a.getUserSets().then(function(e){r.sets=e.data.data.own}),r.refreshTeam=function(){a.getUserSetsTeam().then(function(e){r.team=e.data.data})},r.addUserToSets=function(){if(r.selectedSets.length&&r.newUserEmail){_.map(r.selectedSets,function(e){return e.id}).join(",")}},r.refreshTeam(),r}]),angular.module("Cabinet").controller("CV_public_team",["$scope","S_vk","S_utils","S_selfapi",function(e,t,n,a){var r=this;return r.selectedSets=[],a.getUserSets().then(function(e){r.sets=e.data.data.own}),r.refreshTeam=function(){a.getUserSetsTeam().then(function(e){r.team=e.data.data})},r.addUserToSets=function(){if(r.selectedSets.length&&r.newUserEmail){var e=_.map(r.selectedSets,function(e){return e.id}).join(",");a.attachUserToSetByEmail(e,r.newUserEmail).then(function(e){e.data.success&&(r.selectedSets=[],r.newUserEmail="",r.refreshTeam())})}},r.refreshTeam(),r}]);