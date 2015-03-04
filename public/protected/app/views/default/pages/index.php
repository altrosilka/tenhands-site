<?php $this->getView('utils/head'); /*$this->echoMeta(array());*/ $this->getView('utils/header'); ?>

<section class="v_index" data-ng-controller="C_index as ctr">
  <header animated-header>
    <div class="image"></div>
    <div class="inner"> 
      <div class="pull-right">
      <a class="link cabinet" href="/cabinet/">Войти в личный кабинет</a>
      </div>
      <h1 class="main-title">Десять Рук</h1>
      <h2>Управляйте социальными сетями<br>быстро и эффективно</h2>
      <h3 style="display:none;">Публикуй записи парой кликов сразу во все социальные сети, подключай модераторов и анализируй статистику</h3>
    </div>

    <div class="enterForm" ng-class="{'entered': ctr.inprogress}">
      <h3 class="text-center">Начни бесплатно публиковать в свою группу или аккаунт прямо сейчас!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button>
          <i class="loader ion-load-c fa-spin"></i>
          <i class="arrow ion-ios-arrow-right"></i>
        </button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>
 
    <svg class="triangle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>
  </header>


  <section class="section advanSection">
    <h2>Размещение записей в социальных сетях</h2>
    <ul class="advan clearfix">

       <li>
        <div class="icon"><span class="ion-compose"></span></div>
        <h3>4 записи за 10 секунд</h3>
        <div class="text">Публикуйте материалы в <strong style="color:#43668A">ВКонтакте</strong>, <strong style="color:#1DACED">Твиттер</strong>, <strong style="color:#3B5998">Фейсбук</strong>, <strong style="color:#F2952A">Одноклассники</strong> одновременно</div>
      </li>

       <li>
        <div class="icon"><span class="ion-person-stalker"></span></div>
        <h3>Единый аккаунт</h3>
        <div class="text">Нет необходимости переключать вкладки и окна - размещайте записи во все сообщества и аккаунты из одного интерфейса</div>
      </li>



      <li>
        <div class="icon"><span class="ion-person-add"></span></div>
        <h3>Модераторы</h3>
        <div class="text">Поделитесь доступом с командой и делегируйте им публикацию, а не управление социальными аккаунтами</div>
      </li>
     
      <li>
        <div class="icon"><span class="ion-android-time"></span></div>
        <h3>Планирование</h3>
        <div class="text">Планируйте свои записи на 45 дней вперед, отдыхайте на выходных и в отпуске</div>
      </li>  
      <!--
      <li>
        <div class="icon"><span class="ion-clipboard"></span></div>
        <h3>Статистика и отчеты</h3>
        <div class="text">Получайте свежую статистику по сообществам в соцсетях через веб-интерфейс или на электронную почту</div>
      </li>
      -->

      <li>
        <div class="icon"><span class="ion-social-chrome"></span></div>
        <h3>Расширение для Chrome</h3>
        <div class="text">Два клика на любом сайте и запись с текстом и изображением появится в социальных сетях</div>
      </li>  

      <li>
        <div class="icon"><span class="ion-android-lock"></span></div>
        <h3>Все безопасно</h3>
        <div class="text">Сервис использует только разрешенные методы работы с социальными сетями, а личные данные тщательно шифруются</div>
      </li>
    </ul>


    <div class="enterForm light" ng-class="{'entered': ctr.inprogress}">
      <h3 class="text-center">Пробуйте абсолютно бесплатно!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button>
          <i class="loader ion-load-c fa-spin"></i>
          <i class="arrow ion-ios-arrow-right"></i>
        </button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>
    <svg class="triangle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
      <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
    </svg>
  </section>


  <section class="section priceSection">
    <h2>Тарифные планы</h2>
    <div class="plans">
      <div class="wr">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th></th>
              <th class="demo" width="170">
                <h3>Демо</h3>
                <div class="desc">
                попробовать сервис
                </div>
                <div class="price">
                <h4>0₽</h4>
                <div>рублей/месяц</div>
                </div>
              </th>
              <th class="standart" width="170">
                <h3>Личный</h3>
                <div class="desc">
                для самостоятельной публикации
                </div>
                <div class="price">
                <h4>599₽</h4>
                <div>рублей/месяц</div>
                </div>
              </th>
              <th class="optimal" width="170">
                <h3>Компания</h3>
                <div class="desc">
                для команды
                </div>
                <div class="price">
                <h4>899₽</h4>
                <div>рублей/месяц</div>
                </div>
              </th>
              <th class="pro" width="170">
                <h3>Медиа</h3>
                <div class="desc">
                для медиа-агентств
                </div>
                <div class="price">
                <h4>1499₽</h4>
                <div>рублей/месяц</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">человек в команде<i class="help tool ion-help-circled" data-toggle="tooltip" data-placement="right" title="Количество Ваших редакторов и аналитиков, которым можно дать доступ к просмотру и публикации"></i></td>
              <td class="demo">0</td>
              <td class="standart">0</td>
              <td class="optimal">3</td>
              <td class="pro">10</td>
            </tr>
             <tr>
              <td class="text-left">количество наборов<i class="help tool ion-help-circled" data-toggle="tooltip" data-placement="right" title="Набор - совокупность каналов в соцсетях. Например, набор Природа, в котором будет несколько пабликов в ВК и ФБ"></i></td>
              <td class="demo">1</td>
              <td class="standart">2</td>
              <td class="optimal">3</td>
              <td class="pro">10</td>
            </tr>
            <tr>
              <td class="text-left">каналов в одном наборе<i class="help tool ion-help-circled" data-toggle="tooltip" data-placement="right" title="Канал - паблик, группа или аккаунт (для Твиттера) в социальной сети"></i></td>
              <td class="demo">2</td>
              <td class="standart">5</td>
              <td class="optimal">5</td>
              <td class="pro">10</td>
            </tr>
            <tr>
              <td class="text-left">планирование<i class="help tool ion-help-circled" data-toggle="tooltip" data-placement="right" title="На сколько дней вперед можно планировать пабликацию записей"></i></td>
              <td class="demo">нет</td>
              <td class="standart">на 14 дней</td>
              <td class="optimal">на 30 дней</td>
              <td class="pro">на 45 дней</td>
            </tr>
            
          </tbody>
        </table>

      </div>
    </div>
    <div class="promoinfo text-center">
    Кстати, в нашей <a href="https://vk.com/10hands" target="_blank">группе в ВК</a> мы частенько дарим промокоды и активно общаемся с клиентами
    </div>

    <div class="enterForm light" ng-class="{'entered': ctr.inprogress}">
      <h3 class="text-center">Зарегистрируйтесь, оплатите подписку и начните пользоваться</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button>
          <i class="loader ion-load-c fa-spin"></i>
          <i class="arrow ion-ios-arrow-right"></i>
        </button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div> 

     <svg class="triangle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>
  </section>


  <section class="section clientsSection">
    <h2>У кого десять рук?</h2>
    <div class="text-center logos">
      <img src="/images/logos/sports.png" alt="Sports.ru">
    </div>


    <div class="enterForm light" ng-class="{'entered': ctr.inprogress}">
      <h3 class="text-center">Присоединяйтесь и Вы!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button>
          <i class="loader ion-load-c fa-spin"></i>
          <i class="arrow ion-ios-arrow-right"></i>
        </button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>

     <svg class="triangle next2" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>
  </section>

  <footer>
    
    <menu>

      <a href="#/contacts/" class="link">Контакты</a>
      <a href="/rules/" class="link">Пользовательское соглашение</a>
    </menu>
  </footer>
</section>
<?php $this->getView('utils/footer'); exit;
