angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/modals/addChannelFb.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление аккаунта Facebook</h3>\n</div>\n<div class=\"modal-body\">\n  <div ng-if=\"ctr.accounts.length\">\n    <p>Выбери аккаунт, который является владельцем добавляемой группы</p>\n    <select class=\"form-control\" ng-options=\"account.screen_name for account in ctr.accounts\" ng-model=\"ctr.selectedAccount\"></select>\n\n    <p>Введи ссылку на группу, которую хочешь добавить</p>\n    <select class=\"form-control\" ng-options=\"page.name for page in ctr.pages\" ng-model=\"ctr.selectedPage\"></select>\n  </div>\n  <div ng-if=\"!ctr.accounts.length\">\n    Перед тем как добавлять паблики и группы, нужно <a class=\"link\" ui-sref=\"public.accounts\" ng-click=\"$close();\">добавить аккаунт</a>\n  </div>\n  <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/modals/addChannelIg.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление аккаунта Instagram</h3>\n</div>\n<div class=\"modal-body\">\n  <p>Введи данные для входа в аккаунт, который ты хочешь прикрепить</p>\n  <form ng-submit=\"ctr.resolveAndAdd()\">\n    <input class=\"form-control\" type=\"text\" placeholder=\"логин\" ng-model=\"ctr.username\">\n    <input class=\"form-control\" type=\"password\" placeholder=\"пароль\" ng-model=\"ctr.password\">\n    <input type=\"submit\" style=\"position:absolute;left:-9999px\">\n    <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n  </form>\n</div> \n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/modals/addChannelOk.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление группы OK</h3>\n</div>\n<div class=\"modal-body\">\n  <div ng-if=\"ctr.accounts.length\">\n    <p>Выбери аккаунт, чью группу ты хочешь добавить</p>\n    <select class=\"form-control\" ng-options=\"account.screen_name for account in ctr.accounts\" ng-model=\"ctr.selectedAccount\"></select>\n\n    <p>Введи ID группы, которую хочешь присоединить</p>\n    <input class=\"form-control\" type=\"text\" placeholder=\"43875834656\" ng-model=\"ctr.gid\">\n  </div>\n  <div ng-if=\"!ctr.accounts.length\">\n    Перед тем как добавлять группы, нужно <a class=\"link\" ui-sref=\"public.accounts\" ng-click=\"$close();\">добавить аккаунт</a>\n  </div>\n  <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/modals/addChannelTw.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление аккаунта Twitter</h3>\n</div>\n<div class=\"modal-body\">\n  <p>Чтобы авторизоваться в Twitter тебе необходимо разрешить нашему приложению размещать записи от твоего аккаунта.</p>\n  <p>Нажми на кнопку \"авторизоваться\" и разреши в открывшемся окне доступ к нужному аккаунту.</p>\n  <p>Данный метод авторизации абсолютно безопасен, мы не храним паролей от твоего аккаунта.</p>\n</div>\n<div class=\"modal-footer\">\n  <a class=\"btn btn-primary\" target=\"_blank\" ng-disabled=\"!ctr.authUrl\" ng-href=\"{{ctr.authUrl}}\" ng-click=\"ctr.onAuthStart();\">авторизоваться</a>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/modals/addChannelVk.html","<div class=\"modal-header\">\n  <h3 class=\"modal-title\">Добавление группы</h3>\n</div>\n<div class=\"modal-body\">\n  <div ng-if=\"ctr.accounts.length\">\n    <p>Выбери аккаунт, чей паблик ты хочешь добавить</p>\n    <select class=\"form-control\" ng-options=\"account.screen_name for account in ctr.accounts\" ng-model=\"ctr.selectedAccount\"></select>\n\n    <p>Введи ссылку на группу, которую хочешь добавить</p>\n    <select class=\"form-control\" ng-options=\"group.name for group in ctr.groups\" ng-model=\"ctr.selectedGroup\"></select>\n  </div>\n  <div ng-if=\"!ctr.accounts.length\">\n    Перед тем как добавлять паблики и группы, нужно <a class=\"link\" ui-sref=\"public.accounts\" ng-click=\"$close();\">добавить аккаунт</a>\n  </div>\n  <strong class=\"text-danger\" ng-bind=\"ctr.error\"></strong>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\" ng-click=\"ctr.resolveAndAdd()\">добавить</button>\n  <button class=\"btn btn-default\" ng-click=\"$dismiss()\">отмена</button>\n</div>\n");
$templateCache.put("templates/modals/paymentRequest.html","<section class=\"vm_infoModal\">\n  <div class=\"modal-header\">\n    <h3 class=\"modal-title\">Необходима оплата</h3>\n  </div>\n  <div class=\"modal-body\">\n    Данное действие недопустимо для Вашего тарифа. Чтобы продолжить, Вам нужно сменить тариф.\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-default\" ng-click=\"$close()\">Закрыть</button>\n    <a class=\"btn btn-primary\" ui-sref=\"account.plan\" ng-click=\"$close()\">Новый тариф</a>\n  </div>\n \n  </div>\n</section>\n");
$templateCache.put("templates/directives/customSelect.html","<div class=\"custom_select\" ng-class=\"{\'opened\':cSCtr.opened}\">\n  <section ng-click=\"cSCtr.open()\" ng-bind-html=\"section\"></section>\n  <menu ng-show=\"customContent\" data-role=\"custom-content\"></menu>\n  <menu ng-show=\"!customContent\">\n    <button class=\"option\" ng-repeat=\"option in options\" ng-click=\"cSCtr.selectOption($event, option)\" ng-disabled=\"cSCtr.isDisabled(option)\" ng-class=\"{\'active\':cSCtr.isActive(option)}\">\n      <span compile=\"optionFormat\"></span>\n    </button>\n  </menu>\n</div> \n ");
$templateCache.put("templates/directives/dateInterval.html","<span>{{filteredStart}}</span> - <span>{{filteredEnd}}</span>");
$templateCache.put("templates/directives/member.html","<div class=\"title clearfix\">\n  <span class=\"name pull-left\" ng-bind=\"ctr.getName()\"></span>\n  <div class=\"plural pull-right\">\n    <span class=\"link\" ng-pluralize count=\"ctr.getSetsCount(member)\" when=\"ctr.setsPlural\" ng-click=\"ctr.open()\" ng-class=\"{\'active\': ctr.activeMode}\"></span>\n  </div>\n</div>\n</div>\n\n<section class=\"section clearfix\">\n\n  <div class=\"setsArea\" ng-if=\"ctr.activeMode\">\n    <div class=\"set clearfix\" ng-class=\"ctr.getSetClass(set)\" ng-repeat=\"set in ctr.sets\">\n      <span class=\"titleName pull-left\" ng-bind=\"set.name\"></span>\n      <div class=\"link pull-right toggler\" ng-click=\"ctr.toggleUserFromSet(set)\">\n        <span class=\"remove\">убрать доступ</span>\n        <span class=\"add\">восстановить</span>\n      </div>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("templates/directives/set.html","<div class=\"title\">\n\n  <span ng-bind=\"set.name\" ng-if=\"guestAccess\"></span>\n\n  <input class=\"name\" ng-if=\"!guestAccess\" ng-model=\"set.name\" ng-blur=\"ctr.setNewName(set.name)\" ng-keyup=\"ctr.onNameKeyup(set.name)\" ng-class=\"{\'error\':ctr.errorInName}\">\n  <div class=\"plural\">\n    <span class=\"link\" ng-pluralize count=\"ctr.getChannelsCount(set.feed_ids)\" when=\"ctr.channelsPlural\" ng-click=\"ctr.openSet(set,\'channels\')\" ng-class=\"{\'active\': ctr.activeMode === \'channels\'}\"></span>\n    <div class=\"ib\" ng-if=\"!guestAccess\"> / <span class=\"link\" ng-pluralize count=\"ctr.getUsersCount(set.guest_users_ids)\" when=\"ctr.usersPlural\" ng-click=\"ctr.openSet(set, \'users\')\" ng-class=\"{\'active\': ctr.activeMode === \'users\'}\"></span>\n    </div>\n  </div>\n</div>\n\n<section class=\"section clearfix\">\n  <div class=\"channelsarea bar\" ng-if=\"ctr.activeMode === \'channels\'\">\n    <div class=\"channelsList\">\n      <div class=\"channel\" ng-repeat=\"channel in ctr.openedSetChannels\" ng-class=\"ctr.getChannelClass(channel)\">\n        <div class=\"socialBg\" data-network=\"{{channel.network}}\">\n          <i class=\"fa\" ng-class=\"ctr.getNetworkIconClass(channel.network)\"></i>\n        </div>\n        <div class=\"pull-right link toggler\" ng-click=\"ctr.toggleChannel(channel)\" ng-if=\"!guestAccess\">\n          <span class=\"remove\">открепить</span>\n          <span class=\"add\">прикрепить</span>\n        </div>\n        <a class=\"name link inverse\" target=\"_blank\" ng-bind=\"channel.screen_name\" ng-href=\"{{ctr.getChannelLink(channel.network, channel.screen_name)}}\"></a>\n      </div>\n      <div class=\"noResults\" ng-show=\"!ctr.openedSetChannels.length\">Нет ни одного канала</div>\n    </div>\n    <div ng-if=\"ctr.channelsLoaded\">\n      <div class=\"addChannelsLine\" ng-if=\"!guestAccess && !ctr.showPaymentRequest()\">\n        <div class=\"smTitle\" ng-if=\"ctr.openedSetChannels.length\">Добавить еще один канал</div>\n        <div class=\"smTitle\" ng-if=\"!ctr.openedSetChannels.length\">Добавь канал в этот набор</div>\n        <div>\n          <span class=\"btn vk socialBg\" ng-click=\"ctr.addChannel(\'vk\', set)\"><i class=\"fa fa-vk\"></i></span>\n          <span class=\"btn fb socialBg\" ng-click=\"ctr.addChannel(\'fb\', set)\"><i class=\"fa fa-facebook\"></i></span>\n          <span class=\"btn tw socialBg\" ng-click=\"ctr.addChannel(\'tw\', set)\"><i class=\"fa fa-twitter\"></i></span>\n          <span class=\"btn ig socialBg ng-hide\" ng-click=\"ctr.addChannel(\'ig\', set)\"><i class=\"fa fa-instagram\"></i></span>\n          <span class=\"btn ok socialBg\" ng-click=\"ctr.addChannel(\'ok\', set)\">ok</span>\n          <span class=\"btn gp socialBg ng-hide\"><i class=\"fa fa-google-plus\"></i></span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"addChannelsLine\" ng-if=\"!guestAccess && ctr.showPaymentRequest()\">\n      <p>Добавить ещё один канал в этот набор на тарифе <strong ng-bind=\"ctr.pricingPlanName\"></strong> невозможно. <a class=\"btn btn-primary\" style=\"margin-top:20px;\" ui-sref=\"account.plan\">Улучшить тариф</a>\n      </p>\n    </div>\n  </div>\n\n  <div class=\"usersArea bar\" ng-if=\"!guestAccess && ctr.activeMode === \'users\'\">\n    <div class=\"channelsList\">\n      <div class=\"user\" ng-repeat=\"user in ctr.openedSetUsers\" ng-class=\"ctr.getUserClass(user)\">\n        <div class=\"pull-right link toggler\" ng-click=\"ctr.toggleUser(user)\">\n          <span class=\"remove\">убрать доступ</span>\n          <span class=\"add\">восстановить</span>\n        </div>\n\n        <div class=\"pull-right mood\" ng-if=\"user.not_confirmed\" tooltip=\"Пользователь еще не успел зарегистрироваться\" tooltip-placement=\"left\" tooltip-trigger=\"mouseenter\" tooltip-append-to-body=\"true\" tooltip-popup-delay=\"0\">\n          <i class=\"fa fa-frown-o\"></i>\n        </div>\n\n        <span class=\"email\" ng-bind=\"user.email\"></span>\n        <div class=\"ib\" ng-if=\"user.name\">\n          (<span ng-bind=\"user.name\"></span>)\n        </div>\n\n\n\n      </div>\n      <div class=\"noResults\" ng-show=\"!ctr.openedSetUsers.length\">Нет ни одного пользователя</div>\n    </div>\n    <div class=\"addChannelsLine\" ng-if=\"!guestAccess\">\n\n      <div class=\"smTitle ng-hide\">Добавить пользователя</div>\n\n      <form class=\"addNewUserForm subOnInput\" ng-submit=\"ctr.addNewUser(ctr.newUserEmail)\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"E-Mail пользователя\" ng-model=\"ctr.newUserEmail\">\n        <button class=\"btn btn-primary\">Предоставить доступ</button>\n      </form>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("templates/other/downloadExtension.html","<section class=\"downloadExtension\" ng-class=\"{\'active\':ctr.showAddExtensionLayer}\">\n	Пожалуйста, скачайте расширение для хрома!\n</section> \n\n\n");
$templateCache.put("templates/views/index.html","<section class=\"v_index view\">\n\n\n  <div class=\"notifyPanel inView text-center\" notify-panel=\"c:index:greet\">\n    <strong>Привет!</strong> Перед началом работы заполни, пожалуйста, информацию о себе, установи расширение и подтверди E-Mail\n  </div>\n\n  <div class=\"panelArea clearfix\">\n\n    <div class=\"bg-success successEmail\" ng-if=\"ctr.showNotify\">\n      <span class=\"pull-right ion-close-round\" ng-click=\"ctr.closeNotify()\"></span>\n      <span ng-bind=\"ctr.notifyText\"></span>\n    </div>\n\n    <div class=\"panel clearfix\" ng-if=\"!ctr.extensionIsInstalled\">\n      <div class=\"icon\">\n        <i class=\"ion-social-chrome\"></i>\n      </div>\n      <div class=\"inner\">\n        <h2>Установите расширение для работы</h2>\n        <form>\n          <a href=\"https://chrome.google.com/webstore/detail/%D0%B4%D0%B5%D1%81%D1%8F%D1%82%D1%8C-%D1%80%D1%83%D0%BA/oejjcepegjobphogjdihoahgoekjimkl\" target=\"_blank\" class=\"btn btn-primary\" ng-click=\"ctr.onGoingToStore()\">Скачать из Web Store</a>\n        </form>\n        <p class=\"text\">Без расширения работа будет невозможна.\n          <br>Это закон.</p>\n      </div>\n    </div>\n\n    <div class=\"panel clearfix\" ng-if=\"ctr.state.reqName\">\n      <div class=\"icon\">\n        <i class=\"ion-mic-a\"></i>\n      </div>\n      <div class=\"inner\">\n        <h2>Представьтесь, пожалуйста</h2>\n        <form class=\"line\" ng-submit=\"ctr.saveName(ctr.userName)\">\n          <input type=\"text\" class=\"form-control name\" ng-model=\"ctr.userName\" placeholder=\"Отто фон Бисмарк?\">\n          <button class=\"btn btn-primary\">Сохранить</button>\n        </form>\n        <p class=\"text\">Напишите нам как к Вам обращаться.\n          <br>И Вам приятно и нам приятно.</p>\n      </div>\n    </div>\n\n    <div class=\"ng-hide panel clearfix\" ng-if=\"ctr.state.unknownCompany\">\n      <div class=\"icon\">\n        <i class=\"ion-ios-people\"></i>\n      </div>\n      <div class=\"inner\">\n        <h2>Название Вашей компании</h2>\n        <form class=\"comp\" ng-submit=\"ctr.saveUserCompany(ctr.userCompany)\">\n          <input type=\"text\" class=\"form-control name\" ng-model=\"ctr.userCompany\" placeholder=\"Астронавтикс\">\n          <button class=\"btn btn-primary\">Сохранить</button>\n          <button class=\"btn btn-default ignore\" ng-click=\"ctr.saveUserCompany(\'unknown\')\">Скрыть</button>\n        </form>\n        <p class=\"text\">Здорово, если Вы укажите компанию, в которой работаете.\n          <br>Так мы сможем подстроиться под Ваши задачи.</p>\n\n      </div>\n    </div>\n\n    <div class=\"panel clearfix\" ng-if=\"ctr.state.randomPassword\">\n      <div class=\"icon\">\n        <i class=\"ion-more\"></i>\n      </div>\n      <div class=\"inner\">\n        <h2>Запоминающийся пароль</h2>\n        <form class=\"line\" ng-submit=\"ctr.changePassword(ctr.userPassword)\">\n          <input type=\"text\" class=\"form-control name\" ng-model=\"ctr.userPassword\" placeholder=\"q•ert•as•f\">\n          <button class=\"btn btn-primary\">Сохранить</button>\n        </form>\n        <p class=\"text\">Мы сделали Вам случайный пароль и отправили его на почту.\n          <br>Хотя лучше сменить его прямо сейчас.</p>\n\n      </div>\n    </div>\n\n\n\n    <div class=\"panel clearfix\" ng-if=\"ctr.state.emailNotVerified\">\n      <div class=\"icon\">\n        <i class=\"ion-ios-email-outline\"></i>\n      </div>\n      <div class=\"inner\">\n        <h2>Подтвердите E-Mail</h2>\n        <p class=\"text\">Тогда Вы сможете восстанавливать пароль и работа с системой будет безопаснее</p>\n      </div>\n\n    </div>\n  </div>\n\n  <a ui-sref=\"public.sets\" class=\"link\">Перейти к каналам</a> / <a ui-sref=\"public.accounts\" class=\"link\">Перейти к аккаунтам</a>\n</section>\n");
$templateCache.put("templates/views/login.html","<section class=\"v_login\" ng-controller=\"CV_login as login_ctr\" ng-class=\"{\'restoreMode\':login_ctr.restoreMode, \'successRestore\':login_ctr.successRestore}\">\n  <a href=\"/\" class=\"homelink link\">Обратно на сайт</a>\n  <div class=\"bb\">\n    <form class=\"text-center\" ng-class=\"{\'error\':login_ctr.error}\" ng-submit=\"login_ctr.auth(login_ctr.email, login_ctr.password)\">\n      <div>\n        <div class=\"wrapInput\">\n          <span class=\"input input--juro\" ng-class=\"{\'input--filled\': login_ctr.email != \'\'}\">\n      <input class=\"input__field input__field--juro\" type=\"text\" id=\"input-1\" ng-model=\"login_ctr.email\" />\n      <label class=\"input__label input__label--juro\" for=\"input-1\">\n          <span class=\"input__label-content input__label-content--juro\">Адрес электронной почты</span>\n          </label>\n          </span>\n        </div>\n        <div class=\"wrapInput\">\n          <span class=\"input input--juro\" ng-class=\"{\'input--filled\': login_ctr.password != \'\'}\">\n      <input class=\"input__field input__field--juro\" type=\"password\" id=\"input-2\" ng-model=\"login_ctr.password\" />\n      <label class=\"input__label input__label--juro\" for=\"input-2\">\n          <span class=\"input__label-content input__label-content--juro\">Пароль</span>\n          </label>\n          </span>\n        </div>\n      </div>\n      <div>\n        <button class=\"btn btn-primary introButton\">\n          <span>Войти</span>\n        </button>\n      </div>\n      <input type=\"submit\" style=\"left:-9999px;position:absolute\">\n    </form>\n    <div class=\"forgotPassword\">\n      <div class=\"text-center\"><span class=\"link\" ng-click=\"login_ctr.toggleRestorePassword()\">\n      <span ng-if=\"!login_ctr.restoreMode\">Забыли пароль?</span>\n        <span ng-if=\"login_ctr.restoreMode\">Вспомнили?</span>\n        </span>\n      </div>\n      <div class=\"area\">\n        <form class=\"text-center\" ng-class=\"{\'error\':login_ctr.error}\" ng-submit=\"login_ctr.restore(login_ctr.email)\">\n          <div>\n            <div class=\"wrapInput\">\n              <span class=\"input input--juro\" ng-class=\"{\'input--filled\': login_ctr.email != \'\'}\">\n            <input class=\"input__field input__field--juro\" type=\"text\" id=\"input-1\" ng-model=\"login_ctr.email\" />\n          <label class=\"input__label input__label--juro\" for=\"input-1\">\n          <span class=\"input__label-content input__label-content--juro\">Адрес электронной почты</span>\n              </label>\n              </span>\n            </div>\n          </div>\n          <div>\n            <button class=\"btn btn-primary introButton\">\n              <span>Восстановить доступ</span>\n            </button>\n          </div>\n          <input type=\"submit\" style=\"left:-9999px;position:absolute\">\n        </form>\n      </div>\n    </div>\n  </div>\n  <div class=\"last\">\n    Проверяйте почту <strong ng-bind=\"login_ctr.email\"></strong>, мы выслали Вам все необходимые инструкции.\n  </div>\n</section>\n");
$templateCache.put("templates/views/account/index.html","<header class=\"viewNavigation\">\n  <a ui-sref=\"account.plan\" ui-sref-active=\"active\">Тариф и планы</a>\n  <a class=\"ng-hide\" ui-sref=\"account.change_password\" ui-sref-active=\"active\">Смена пароля</a>\n  <a class=\"ng-hide\" ui-sref=\"account.payments\" ui-sref-active=\"active\">Платежи</a>\n</header>\n<section class=\"view pushedFromLeft\">\n  <ui-view></ui-view>\n</section>\n");
$templateCache.put("templates/views/account/plan.html","<div class=\"v_account_plan\">\n\n\n\n  <section class=\"section priceSection\">\n    <div class=\"clearfix\"> \n\n      <div class=\"bg-danger topnanana\" ng-show=\"ctr.paidUntilStr_past\">Публикация заблокирована. Для дальнейшей работы необходимо продлить подиску</div>\n\n      <div class=\"bg-warning topnanana\" ng-show=\"ctr.paidUntilStr_now\">Необходимо продлить тарифный план <strong>прямо сейчас</strong>, иначе Вы потеряете возможность публиковать материалы</div>\n\n        <div class=\"bg-warning topnanana\" >Сервис работает в режиме бета-тестирования, доступ ко всем функциям бесплатный</div>\n\n      <section class=\"currentPlanName\">\n        Текущий тарифный план:\n        <span class=\"name\" ng-bind=\"ctr.getCurrentPlanName()\"></span>\n\n        <div class=\"ib\" ng-show=\"ctr.paidUntilStr\">\n          <div class=\"ib bg-danger\" ng-show=\"ctr.paidUntilStr_past\">\n            подписка истекла <span ng-bind=\"ctr.paidUntilStr\"></span>\n          </div>\n\n          <div class=\"ib bg-warning\" ng-show=\"ctr.paidUntilStr_now || ctr.paidUntilStr_future\">\n            подписка истечет <span ng-bind=\"ctr.paidUntilStr\"></span>\n          </div>\n        </div>\n      </section>\n\n\n\n      <h2>Доступные тарифные планы</h2>\n    </div>\n    <div class=\"plans\">\n      <div class=\"wr\">\n\n        <div class=\"divTable clearfix\" data-width=\"{{ctr.plans.length}}\">\n          <div class=\"col big\">\n            <div class=\"row\">\n              человек в команде<i class=\"help tool ion-help-circled\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Количество Ваших редакторов и аналитиков, которым можно дать доступ к просмотру и публикации\"></i>\n            </div>\n\n            <div class=\"row\">\n              количество наборов<i class=\"help tool ion-help-circled\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Набор - совокупность каналов в соцсетях. Например, набор Природа, в котором будет несколько пабликов из ВК и ФБ\"></i>\n            </div>\n\n            <div class=\"row\">\n              каналов в одном наборе <i class=\"help tool ion-help-circled\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Канал - паблик, группа или аккаунт (для Твиттера) в социальной сети\"></i>\n            </div>\n\n            <div class=\"row\">\n              планирование<i class=\"help tool ion-help-circled\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"На сколько дней вперед можно планировать публикацию записей\"></i>\n            </div>\n          </div>\n          <div class=\"col\" ng-repeat=\"plan in ctr.plans\" ng-class=\"{current: ctr.thisIsCurrentPlan(plan), \'special\': plan.special}\">\n            <header>\n              <h3 ng-bind=\"plan.name\"></h3>\n              <div class=\"price\">\n                <h4><span ng-bind=\"plan.price\"></span>₽</h4>\n                <div>рублей/месяц</div>\n              </div>\n            </header>\n            <div class=\"row\">\n              <span ng-bind=\"plan.team_size\"></span>\n            </div>\n            <div class=\"row\">\n              <span ng-bind=\"plan.max_sets_count\"></span>\n            </div>\n            <div class=\"row\">\n              <span ng-bind=\"plan.max_channels_in_set\"></span>\n            </div>\n            <div class=\"row\">\n              <span ng-bind=\"plan[\'planning:str\']\"></span>\n            </div>\n            <div class=\"row ng-hide\">\n              <button ng-if=\"!ctr.thisIsCurrentPlan(plan)\" class=\"btn btn-primary\" ng-click=\"ctr.selectPlan(plan)\">Перейти сейчас</button>\n              <button ng-if=\"ctr.thisIsCurrentPlan(plan) && plan.id !== 0\" class=\"btn btn-success\" ng-click=\"ctr.selectPlan(plan)\">Продлить</button>\n              <span class=\"currentText\" ng-if=\"ctr.thisIsCurrentPlan(plan) && plan.id === 0\">текущий план</span>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <div class=\"promoinfo text-center\">\n      Кстати, в нашей <a href=\"https://vk.com/10hands\" target=\"_blank\">группе в ВК</a> мы частенько дарим промокоды и активно общаемся с клиентами\n    </div>\n\n\n  </section>\n\n\n</div>\n");
$templateCache.put("templates/views/analytic/index.html","<header class=\"viewNavigation\">\n  <a ui-sref=\"analytic.sandbox\" ui-sref-active=\"active\">Песочница</a>\n</header>\n<section class=\"view \">\n  <ui-view></ui-view>\n</section>\n");
$templateCache.put("templates/views/analytic/sandbox.html","<div class=\"wrapper container clearfix v_analytic_sandbox\" ng-class=\"{\'fullState\':!fC.shortState}\">\n  <div class=\"fake-bg\" ng-show=\"fC.selectIntervalArea\"></div>\n  <div class=\"header\">\n\n    <div class=\"switcher\" ng-click=\"fC.toggleState()\" style=\"display:none;\">\n      <i class=\"fa fa-angle-down\"></i>\n    </div>\n\n\n    <div class=\"pickup_area full\" style=\"display:none;\">\n      <div choose-branch branches-array=\"fC.branches\" on-branch-change=\"fC.onBranchToggle\" input-type=\"\'checkbox\'\"></div>\n      <div class=\"full-header\">\n        <div class=\"date\" date-interval start=\"fC.startDate\" end=\"fC.endDate\" ng-click=\"fC.openSelectIntervalArea()\"></div>\n        <div class=\"calicon\" ng-click=\"fC.openSelectIntervalArea()\"></div>\n        <button class=\"btn btn-default btn-sm intervalButton\" ng-class=\"{\'active\':fC.intervalIsActive(interval)}\" ng-click=\"fC.setInterval(interval)\" ng-repeat=\"interval in fC.timeIntervals\">{{interval.title}}</button>\n      </div>\n\n      <div class=\"area clearfix\">\n        <div class=\"clearfix paramsArea col-xs-6 col0\">\n          <button class=\"btn btn-default param\" ng-repeat=\"param in fC.paramsArray\" ng-click=\"fC.selectParam(param, 0)\" ng-class=\"{\'disabled\':fC.paramAlreadySelected(param, 0), \'active\':fC.paramIsActive(param, 0)}\">\n            {{param.description}}\n            <div class=\"bottomLine\">\n              <div class=\"line\" ng-repeat=\"branch in fC.selectedBranches\" ng-style=\"{\'width\':(100/fC.selectedBranches.length)+\'%\',\'background-color\':fC.getColorByBranch(branch)}\"></div>\n            </div>\n          </button>\n        </div>\n        <div class=\"plus\" ng-class=\"{\'active\':fC.selectedParams[0].name}\">\n          <div><i class=\"fa fa-plus\"></i>\n          </div>\n        </div>\n        <div class=\"clearfix paramsArea col-xs-6 col1\" ng-class=\"{\'active\':fC.selectedParams[0].name}\">\n          <button class=\"btn btn-default param\" ng-repeat=\"param in fC.paramsArray\" ng-click=\"fC.selectParam(param, 1)\" ng-class=\"{\'disabled\':fC.paramAlreadySelected(param, 1), \'active\':fC.paramIsActive(param, 1)}\">\n            {{param.description}}\n            <div class=\"bottomLine\">\n              <div class=\"line\" ng-repeat=\"branch in fC.selectedBranches\" ng-style=\"{\'width\':(100/fC.selectedBranches.length)+\'%\',\'background-color\':fC.getColorByBranch(branch)}\"></div>\n            </div>\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"pickup_area small\">\n      <div class=\"date\" date-interval start=\"fC.startDate\" end=\"fC.endDate\" ng-click=\"fC.openSelectIntervalArea()\"></div>\n      <div class=\"calicon\" ng-click=\"fC.openSelectIntervalArea()\"></div>\n\n      <span class=\"select\">\n        <span class=\"branchesMenu\" custom-select section-format=\"fC.getSelectPlaceholder(\'branches\')\" custom-content=\"true\">\n          <div choose-branch branches-array=\"fC.branches\" on-branch-change=\"fC.onBranchToggle\" input-type=\"\'checkbox\'\"></div>\n        </span>\n      </span>\n\n      <span class=\"textLabel\">Сравнить</span>\n\n      <span class=\"select\">\n        <span custom-select section-format=\"fC.getSelectPlaceholder(0)\" custom-content=\"true\">\n          <button class=\"option\" ng-repeat=\"param in fC.paramsArray\" ng-click=\"fC.selectParam(param, 0);$close();\" ng-class=\"{\'active\':fC.paramIsActive(param, 0)}\" ng-disabled=\"fC.paramAlreadySelected(param, 0)\">\n            {{param.description}}\n          </button>\n        </span>\n      <div class=\"bottomLine\" ng-show=\"fC.selectedParams[0].name\">\n        <div class=\"line\" ng-repeat=\"branch in fC.selectedBranches\" ng-style=\"{\'width\':(100/fC.selectedBranches.length)+\'%\',\'background-color\':fC.getColorByBranch(branch)}\"></div>\n      </div>\n      </span>\n\n      <span class=\"textLabel\">с</span>\n\n      <span class=\"select col1\">\n        <span custom-select section-format=\"fC.getSelectPlaceholder(1)\" custom-content=\"true\">\n          <button class=\"option\" ng-repeat=\"param in fC.paramsArray\" ng-click=\"fC.selectParam(param, 1);$close();\" ng-class=\"{\'active\':fC.paramIsActive(param, 1)}\" ng-disabled=\"fC.paramAlreadySelected(param, 1)\">\n            {{param.description}}\n          </button>\n        </span>\n      <div class=\"bottomLine\" ng-show=\"fC.selectedParams[1].name\">\n        <div class=\"line\" ng-repeat=\"branch in fC.selectedBranches\" ng-style=\"{\'width\':(100/fC.selectedBranches.length)+\'%\',\'background-color\':fC.getColorByBranch(branch)}\"></div>\n      </div>\n      </span>\n    </div>\n\n\n\n    <div class=\"intervalArea\" ng-class=\"{\'active\':fC.selectIntervalArea}\" ng-click=\"fC.intervalClick($event);\" ng-mouseleave=\"fC.closeSelectIntervalArea()\">\n      <div class=\"head\">\n        <div class=\"date\" date-interval start=\"fC.startDate\" end=\"fC.endDate\" ng-click=\"fC.closeSelectIntervalArea()\"></div>\n        <div class=\"calicon\" ng-click=\"fC.closeSelectIntervalArea()\"></div>\n      </div>\n\n      <div class=\"datePickers\">\n        <datepicker show-weeks=\"false\" starting-day=\"1\" max-date=\"fC.endDate\" max-mode=\"day\" format-day=\"d\" ng-model=\"fC.startDate\" class=\"calendar\"></datepicker>\n        <datepicker show-weeks=\"false\" starting-day=\"1\" max-date=\"$root.yesterday\" min-date=\"fC.startDate\" max-mode=\"day\" format-day=\"d\" ng-model=\"fC.endDate\" class=\"calendar\"></datepicker>\n      </div>\n    </div>\n\n  </div>\n\n\n\n  <div class=\"chartArea\">\n    <div ng-show=\"fC.stateChangeInProgress\" class=\"loading\">\n      <span>\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" width=\"48\" height=\"48\" fill=\"#009ee0\">\n          <path opacity=\".25\" d=\"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4\" />\n          <path d=\"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z\">\n            <animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 16 16\" to=\"360 16 16\" dur=\"0.8s\" repeatCount=\"indefinite\" />\n          </path>\n        </svg>\n      </span>\n    </div>\n    <div class=\"chartField\" ng-hide=\"fC.stateChangeInProgress\" ng-class=\"{\'lowOpacity\':fC.stateChangeAfter}\">\n      <div class=\"topLegend\">\n        <div class=\"point\" ng-repeat=\"branch in fC.selectedBranches\">\n          <div class=\"line\" ng-style=\"{\'background-color\':fC.getColorByBranch(branch)}\">\n          </div>\n          <span>\n            {{branch.name}}\n          </span>\n        </div>\n      </div>\n\n      <div ng-hide=\"fC.stateChangeInProgress\" sandbox-chart series=\"fC.graph.series\">\n        <div class=\"chart\">\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("templates/views/public/accounts.html","<section class=\"v_accounts \">\n\n\n  <div class=\"notifyPanel inViewMenu text-center\" notify-panel=\"c:public:accounts:greet\">\n    Перед добавлением каналов нужно добавить аккаунты социальных сетей\n  </div>\n\n  <div class=\"smallWrap\">\n\n    <header class=\"stdHeader\">\n\n      <a class=\"btn socialBg vk\" ng-href=\"{{ctr.getAuthUrl(\'vk\')}}\"><span>Добавить ВК</span></a>\n      <a class=\"btn socialBg fb\" ng-href=\"{{ctr.getAuthUrl(\'fb\')}}\"><span>Добавить Facebook</span></a>\n      <a class=\"btn socialBg ok\" ng-href=\"{{ctr.getAuthUrl(\'ok\')}}\"><span>Добавить OK</span></a>\n\n    </header>\n\n\n    <div class=\"setsarea\">\n      <div class=\"setslist\" ng-show=\"ctr.accounts.length\">\n        <div class=\"account socialBg\" data-network=\"{{account.network}}\" ng-repeat=\"account in ctr.accounts\" ng-click=\"ctr.openSet(account)\">\n          <div class=\"title\">\n            <span ng-bind=\"account.screen_name\"></span>\n\n            <div class=\"pull-right\">\n\n              <span class=\"ib\" ng-bind=\"ctr.getExpiresString(account.expires_in)\">\n            </span>\n              <span class=\"ng-hide link\" ng-click=\"ctr.offAccount(account)\">открепить</span>\n            </div>\n\n          </div>\n        </div>\n      </div>\n      <div class=\"noResults\" ng-hide=\"ctr.accounts.length\">Пока еще нет ни одного аккаунта</div>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("templates/views/public/history.html","<section class=\"v_history smallWrap\">\n\n  <div ng-if=\"ctr.sets.length > 2\">\n    Выбрать набор:\n    <select class=\"form-control\" ng-options=\"set.name for set in ctr.sets\" ng-model=\"ctr.selectedSet\"></select>\n  </div>\n  <div class=\"history\">\n    <div class=\"item\" ng-repeat=\"item in ctr.history\">qwe</div>\n  </div>\n\n</section>\n");
$templateCache.put("templates/views/public/index.html","<header class=\"viewNavigation\">\n  <a ui-sref=\"public.sets\" ui-sref-active=\"active\">Наборы и каналы</a>\n  <a ui-sref=\"public.accounts\" ui-sref-active=\"active\">Социальные аккаунты</a>\n  <a ui-sref=\"public.team\" ui-sref-active=\"active\">Команда</a>\n  <a ui-sref=\"public.table\" ui-sref-active=\"active\">Расписание и история</a>\n</header>\n<section class=\"view pushedFromLeft\">\n  <ui-view></ui-view>\n</section>\n");
$templateCache.put("templates/views/public/sets.html","<section class=\"v_sets\">\n\n  <div class=\"notifyPanel inViewMenu \" notify-panel=\"c:public:team:greet\">\n    <div class=\"widthPanel std\">\n      <strong>Канал</strong> - страница компании в социальной сети (или аккаунт - для Twitter).\n      <br><strong>Набор</strong> - совокупность каналов. Размещение записей проиходит в наборы, а набор состоит из каналов.\n      <br>\n      <br> Добавьте каналы в свой первый набор и разместите первую запись из расширения\n    </div>\n  </div>\n\n  <div class=\"createNewSet\">\n    <form class=\"subOnInput\" ng-submit=\"ctr.addNewSet(ctr.newSetName)\">\n      <input class=\"form-control\" type=\"text\" placeholder=\"Название нового набора\" ng-model=\"ctr.newSetName\">\n      <button class=\"btn btn-primary submit\">Создать набор</button>\n    </form>\n  </div>\n\n\n  <div class=\"setsarea\">\n    <div class=\"setslist\" ng-show=\"ctr.sets.own.length\">\n      <div class=\"set\" set=\"set\" ng-repeat=\"set in ctr.sets.own\" ng-class=\"{\'active\':ctr.setIsAvtive(set)}\">\n\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"setsarea\" ng-if=\"ctr.sets.guest.length\">\n    <h2>Гостевой доступ</h2>\n    <div class=\"setslist\">\n      <div class=\"set\" set=\"set\" guest-access=\"true\" ng-repeat=\"set in ctr.sets.guest\" ng-class=\"{\'active\':ctr.setIsAvtive(set)}\">\n\n      </div>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("templates/views/public/table.html","<section class=\"v_table\">\n\n  <div class=\"notifyPanel inViewMenu text-center\" notify-panel=\"c:public:team:greet\">\n    В разделе <strong>Расписание</strong> отображены все запланированные записи из наборов\n  </div>\n\n\n  <form class=\"addUserForm ng-hide\" ng-submit=\"ctr.addUserToSets()\" ng-if=\"ctr.sets.length\">\n    <input type=\"text\" class=\"form-control\" ng-model=\"ctr.newUserEmail\" placeholder=\"Добавить пользователя по E-mail\">\n\n    <label class=\"select\">\n      <ui-select multiple ng-model=\"ctr.selectedSets\" theme=\"select2\" ng-disabled=\"disabled\" style=\"width:100%;margin:auto\">\n        <ui-select-match placeholder=\"в наборы...\">{{$item.name}}</ui-select-match>\n        <ui-select-choices repeat=\"set in ctr.sets | propsFilter: {name: $select.search}\">\n          <div ng-bind-html=\"set.name | highlight: $select.search\"></div>\n          </small>\n        </ui-select-choices>\n      </ui-select>\n    </label>\n\n    <button class=\"btn btn-primary pull-right\">добавить</button>\n  </form>\n\n\n  <div ui-calendar=\"uiConfig.calendar\" ng-model=\"eventSources\" calendar=\"calendar\"></div>\n\n</section>\n");
$templateCache.put("templates/views/public/team.html","<section class=\"v_team\">\n\n  <div class=\"notifyPanel inViewMenu text-center\" notify-panel=\"c:public:team:greet\">\n    Раздел <strong>Команда</strong> позволяет видеть всех участников, с которыми Вы поделились доступом.<br>Здесь можно быстро добавить нового члена команды или урезать доступ существующему\n  </div>\n\n  <div class=\"members\">\n    <div class=\"member\" member=\"member\" ng-repeat=\"member in ctr.team\" ng-class=\"{\'active\':ctr.setIsAvtive(set)}\">\n\n    </div>\n  </div>\n\n  <div class=\"noResults text-center\" ng-show=\"!ctr.team.length\">\n    Кроме Вас никого в команде нет. Добавим?\n  </div>\n\n  <form class=\"addUserForm\" ng-submit=\"ctr.addUserToSets()\" ng-if=\"ctr.sets.length\">\n    <input type=\"text\" class=\"form-control\" ng-model=\"ctr.newUserEmail\" placeholder=\"Добавить пользователя по E-mail\">\n\n    <label class=\"select\">\n      <ui-select multiple ng-model=\"ctr.selectedSets\" theme=\"select2\" ng-disabled=\"disabled\" style=\"width:100%;margin:auto\">\n        <ui-select-match placeholder=\"в наборы...\">{{$item.name}}</ui-select-match>\n        <ui-select-choices repeat=\"set in ctr.sets | propsFilter: {name: $select.search}\">\n          <div ng-bind-html=\"set.name | highlight: $select.search\"></div>\n          </small>\n        </ui-select-choices>\n      </ui-select>\n    </label>\n\n    <button class=\"btn btn-primary pull-right\">добавить</button>\n  </form>\n\n</section>\n");}]);