<?php 
    session_start();
    include('../../config.php');
    // if(isset($_SESSION['adm'])){

    
    
    if(isset($_REQUEST['nameUser']) && isset($_REQUEST['loginUser']) && isset($_REQUEST['passwdUser'])){

        $user = new User();

        $user->setName(strip_tags($_REQUEST['nameUser']));
        $user->setLogin(strip_tags($_REQUEST['loginUser']));
        $user->setPasswd(strip_tags($_REQUEST['passwdUser']));

        $user->insert();

        echo json_encode($data);
    // }
}
?>