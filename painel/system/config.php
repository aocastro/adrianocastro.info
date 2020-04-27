<?php

    function autoload($className){
        include_once("class/$className.class.php");
    }

    spl_autoload_register("autoload");

?>