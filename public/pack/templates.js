angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/test.html","Это главаня страница, хз что тут...");
$templateCache.put("templates/cabinet/directives/complexGroupChart.html","<div class=\"complexGroupChart\" style=\"width:100%;height:100%;\">\n\n</div>");
$templateCache.put("templates/cabinet/directives/selectDate.html","<div class=\"date-selector\">\n  <div class=\"inputs\" ng-hide=\"hideInputs\">\n    <input onclick=\"this.select()\" class=\"day\" type=\"text\" placeholder=\"11\" data-ng-model=\"editdate.day\">\n    <input onclick=\"this.select()\" class=\"month\" type=\"text\" placeholder=\"08\" data-ng-model=\"editdate.month\">\n    <input onclick=\"this.select()\" class=\"year\" type=\"text\" placeholder=\"2014\" data-ng-model=\"editdate.year\">\n  </div>\n\n  <input type=\"text\" class=\"hidden-input\" close-text=\"Закрыть\" is-open=\"isOpen\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"model\" show-button-bar=\"false\" min-date=\"minDate\"  max-date=\"maxDate\" datepicker-options=\"{ showWeeks: false,  maxMode: \'day\', startingDay: 1, showButtonBar: false, formatDay: \'d\'}\" ng-required=\"true\">\n</div>\n\n");
$templateCache.put("templates/cabinet/modals/addChannelIg.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление аккаунта Instagram</h3>\n</div>\n<div class=\"modal-body\">\n  <p>Введи данные для входа в аккаунт, который ты хочешь прикрепить</p>\n  <form ng-submit=\"ctr.resolveAndAdd()\">\n    <input class=\"form-control\" type=\"text\" placeholder=\"логин\" ng-model=\"ctr.username\">\n    <input class=\"form-control\" type=\"password\" placeholder=\"пароль\" ng-model=\"ctr.password\">\n    <input type=\"submit\" style=\"position:absolute;left:-9999px\">\n    <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n  </form>\n</div> \n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/cabinet/modals/addChannelTw.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление аккаунта Twitter</h3>\n</div>\n<div class=\"modal-body\">\n  <p>Чтобы авторизоваться в Twitter тебе необходимо разрешить нашему приложению размещать записи от твоего аккаунта.</p>\n  <p>Нажми на кнопку \"авторизоваться\" и разреши в открывшемся окне доступ к нужному аккаунт</p>\n  <p>Данный метод авторизации абсолютно безопасен, мы не храним паролей от твоего аккаунта.</p>\n</div>\n<div class=\"modal-footer\">\n  <a class=\"btn btn-primary\" target=\"_blank\" ng-disabled=\"!ctr.authUrl\" ng-href=\"{{ctr.authUrl}}\">авторизоваться</a>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/cabinet/modals/addChannelVk.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление группы</h3>\n</div>\n<div class=\"modal-body\">\n  <p>Введи ссылку на группу, которую хочешь добавить</p>\n  <form ng-submit=\"ctr.resolveAndAdd()\">\n    <input class=\"form-control\" type=\"text\" placeholder=\"https://vk.com/super_public\" ng-model=\"ctr.url\">\n    <input type=\"submit\" style=\"position:absolute;left:-9999px\">\n    <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/cabinet/other/downloadExtension.html","<section class=\"downloadExtension\" ng-class=\"{\'active\':ctr.showAddExtensionLayer}\">\n	Пожалуйста, скачайте расширение для хрома!\n</section> \n\n\n");
$templateCache.put("templates/cabinet/views/index.html","Это главаня страница, хз что тут...  ");
$templateCache.put("templates/cabinet/views/sets/index.html","<div class=\"clearfix\">\n  <div class=\"pull-right\">\n    <form ng-submit=\"ctr.addNewSet(ctr.newSetName)\">\n      <input type=\"form-control\" placeholder=\"название набора\" ng-model=\"ctr.newSetName\">\n      <button class=\"btn btn-primary\">Новый набор</button>\n    </form>\n  </div>\n</div>\n\n<div class=\"setsarea\">\n  <div class=\"setslist\" ng-show=\"ctr.sets.length\">\n    <div class=\"set\" ng-repeat=\"set in ctr.sets\" ng-click=\"ctr.openSet(set)\">\n      <div class=\"title\"><span ng-bind=\"set.name\"></span> |\n        <ng-pluralize count=\"ctr.getChannelsCount(set.feed_ids)\" when=\"ctr.channelsPlural\">\n        </ng-pluralize>\n      </div>\n      <div class=\"channelsarea\" ng-show=\"ctr.openedSet.id === set.id\">\n        <div class=\"addChannelsLine\">\n          <span class=\"title\">добавить каналы</span>\n          <span class=\"btn vk socialBg\" ng-click=\"ctr.addChannel(\'vk\', set)\"><i class=\"fa fa-vk\"></i></span>\n          <span class=\"btn fb socialBg\"><i class=\"fa fa-facebook\"></i></span>\n          <span class=\"btn tw socialBg\" ng-click=\"ctr.addChannel(\'tw\', set)\"><i class=\"fa fa-twitter\"></i></span>\n          <span class=\"btn ig socialBg\" ng-click=\"ctr.addChannel(\'ig\', set)\"><i class=\"fa fa-instagram\"></i></span>\n          <span class=\"btn gp socialBg\"><i class=\"fa fa-google-plus\"></i></span>\n          <span class=\"btn ok socialBg\"><i class=\"fa fa-ok\"></i></span>\n        </div>\n\n        <div class=\"channelsList\">\n          <div class=\"channel\" ng-repeat=\"channel in ctr.openedSetChannels\" ng-class=\"ctr.getChannelClass(channel)\">\n            <span ng-bind=\"channel.screen_name\"></span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"nosets\" ng-hide=\"ctr.sets.length\">Пока еще нет ни одного набора</div>\n</div>\n");}]);