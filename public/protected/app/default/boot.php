<?php


/* HANDLEBARS */
require 'modules/handlebars/Handlebars.php';
require 'modules/handlebars/BaseString.php';
require 'modules/handlebars/Cache.php';
require 'modules/handlebars/Context.php';
require 'modules/handlebars/Helpers.php';
require 'modules/handlebars/Loader.php';
require 'modules/handlebars/Parser.php';
require 'modules/handlebars/SafeString.php';
require 'modules/handlebars/String.php';
require 'modules/handlebars/Template.php';
require 'modules/handlebars/Tokenizer.php';
require 'modules/handlebars/Loader/FilesystemLoader.php';
require 'modules/handlebars/Loader/StringLoader.php';
require 'modules/handlebars/Cache/APC.php';
require 'modules/handlebars/Cache/Disk.php';
require 'modules/handlebars/Cache/Dummy.php';

use Handlebars\Handlebars;
$hb = new Handlebars(array(
    'loader' => new \Handlebars\Loader\FilesystemLoader(protected_folder.'/app/templates/'),
    'partials_loader' => new \Handlebars\Loader\FilesystemLoader(
        protected_folder . '/app/templates/',
        array(
            'prefix' => '_'
        )
    )
));

/* DATABASE */
require_once protected_folder.'/app/default/modules/dataBase/mysql_connect.php';

/* UTILS */
require_once(protected_folder.'/app/default/utils.php');
require_once(protected_folder.'/app/default/underscore.php');
require_once(protected_folder.'/app/classes/definesClass.php');
require_once(protected_folder.'/app/classes/apiClass.php');
require_once(protected_folder.'/app/classes/dataClass.php');


/* ROUTER */
require_once(protected_folder.'/app/default/router.php');