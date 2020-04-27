<?php
    session_start();
    include('../../config.php');
    if(isset($_SESSION['adm'])){
        if(isset($_REQUEST['idUser'])){

            $user = new User();
            $user->setId(strip_tags($_REQUEST['idUser']));
            $user->setName(strip_tags($_REQUEST['nameUser']));
            $user->setLogin(strip_tags($_REQUEST['loginUser']));
            $user->setPasswd(strip_tags($_REQUEST['passwdUser']));

            $user->del();

            echo json_encode($data);
        }
    }
?>