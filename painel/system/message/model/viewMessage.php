<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['idMessage'])){

            $data = Message::view(strip_tags($_REQUEST['idMessage']));

            echo json_encode($data);

        }

    }

?>