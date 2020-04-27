<?php
    session_start();
    include('../../config.php');
    if(isset($_SESSION['adm'])){
        if(isset($_REQUEST['idUser'])){

            $data = User::view(strip_tags($_REQUEST['idUser']));

            echo json_encode($data);
        }
    }
?>