<?php $this->getView('utils/head'); $this->echoMeta(array()); $this->getView('utils/header'); ?>

<section class="v_index" data-ng-controller="C_index as ctr">

  <header animated-header>



    <div class="image"></div>
    <div class="inner">
      <div class="pull-right">
      <a class="link cabinet" href="/cabinet/">Войти в личный кабинет</a>
      </div>
      <h1 class="main-title">Десять рук</h1>
      <h2>Управляйте социальными сетями<br>быстро и эффективно</h2>
      <h3 style="display:none;">Публикуй записи парой кликов сразу во все социальные сети, подключай модераторов и анализируй статистику</h3>
    </div>

    <div class="enterForm">
      <h3 class="text-center">Получите 14 дней тестового периода прямо сейчас!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button><i class="ion-ios-arrow-right"></i></button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>
 
    <svg class="triangle header" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>
  </header>


  <section class="section advanSection">
    <h2>Размещение записей в социальных сетях</h2>
    <ul class="advan clearfix">

       <li>
        <div class="icon"><span class="ion-compose"></span></div>
        <h3>Быстрое размещение</h3>
        <div class="text">Публикуйте материалы в <strong>ВКонтакте</strong>, <strong>Твиттер</strong>, <strong>Фейсбук</strong> и <strong>Инстаграм</strong> одновременно</div>
      </li>

       <li>
        <div class="icon"><span class="ion-person-stalker"></span></div>
        <h3>Единый аккаунт</h3>
        <div class="text">Больше не нужно переключать вкладки и окна - размещайте записи во все сообщества и аккаунты из одного интерфейса</div>
      </li>


      <li>
        <div class="icon"><span class="ion-social-chrome"></span></div>
        <h3>Расширение для Chrome</h3>
        <div class="text">Хотите скопировать материал с сайта? Расширение соберет всю нужную информацию</div>
      </li>  

      <li>
        <div class="icon"><span class="ion-person-add"></span></div>
        <h3>Модераторы</h3>
        <div class="text">Поделитесь доступом с командой - пусть они размещают записи, но не имею доступа к социальным аккаунтам</div>
      </li>
     
      <li>
        <div class="icon"><span class="ion-clipboard"></span></div>
        <h3>Статистика и отчеты</h3>
        <div class="text">Получайте свежую статистику по всем сообществам в веб-интерфейсе или на свою электронную почту</div>
      </li>

      <li>
        <div class="icon"><span class="ion-android-lock"></span></div>
        <h3>Все безопасно</h3>
        <div class="text">Сервис использует только разрешенные методы работы с социальными сетями, а Ваши личные данные шифруются</div>
      </li>
    </ul>


    <div class="enterForm light">
      <h3 class="text-center">Пробуйте бесплатно в течение 14 дней!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button><i class="ion-ios-arrow-right"></i></button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>


        <svg class="triangle next1" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>

  </section>



  <section class="section clientsSection">
    <h2>У кого десять рук?</h2>
    <div class="text-center logos">
      <img src="/images/logos/sports.png" alt="Sports.ru">
      <img src="/images/logos/2gis.png" alt="2GIS">
    </div>


    <div class="enterForm light">
      <h3 class="text-center">Присоединяйтесь и Вы и получите 14 дней тестового периода!</h3>
      <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp(ctr.email, ctr.password)" novalidate="">
        <input ng-model="ctr.email" name="email"  autocomplete="off" type="email" required="" placeholder="Ваш E-Mail">
        <button><i class="ion-ios-arrow-right"></i></button>
        <input type="submit" style="position:absolute;left:-9999px;">
      </form>
    </div>

     <svg class="triangle next2" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="140" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M50 60 L0 10 L0 100 L50 100 M50 100 L100 100 L100 10 L50 60 Z"></path>
      </svg>

  </section>

  <footer>
    
    <menu>
      <a href="#/about/" class="link">О сервисе</a>
      <a href="#/contacts/" class="link">Контакты</a>
      <a href="#/price/" class="link">Цены</a>
      <a href="#/rules/" class="link">Пользовательское соглашение</a>
    </menu>
  </footer>
</section>
<?php $this->getView('utils/footer'); exit;
