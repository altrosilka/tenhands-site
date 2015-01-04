<?php $this->getView('utils/head'); $this->echoMeta(array()); $this->getView('utils/header'); ?>

<section data-ng-controller="C_index as ctr">



  <div class="forms clearfix">
    <form name="signIn" data-ng-submit="signIn.$valid && ctr.signIn()" novalidate="">
      <h2>Войти</h2>
      <input ng-model="ctr.email" name="email" type="email" required="" placeholder="Твой E-Mail">
      <input ng-model="ctr.password" name="password" type="password" required="" placeholder="Пароль">
      <button class="btn btn-success">войти</button>
    </form>
    <form name="signUp" data-ng-submit="signUp.$valid && ctr.signUp()" novalidate="">
      <h2>Зарегистрироваться</h2>
      <input ng-model="ctr.name" name="name" type="text" required="" placeholder="Твоё имя">
      <input ng-model="ctr.email" name="email" type="email" required="" placeholder="Твой E-Mail">
      <input ng-model="ctr.password" name="password" type="password" required="" placeholder="Пароль">
      <button class="btn btn-success">зарегистрироваться</button>
    </form>
  </div> 

  <br>
  <a href="/intro/vk/">это кнопка входа</a>
  <br>

</section>
<?php $this->getView('utils/footer'); exit;
