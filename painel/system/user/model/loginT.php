<?php

    session_start();

    if (isset($_REQUEST['loginUser'])) {

        $login = $_REQUEST['loginUser'];
        $senha = $_REQUEST['senhaUser'];

        if ($login == "eteclins" && $senha = "123") {

            $_SESSION['adm'] = 1;
            
            $data = array("return"=>true);

        } else {

            $data = array("return"=>false);

        }

    }

?>