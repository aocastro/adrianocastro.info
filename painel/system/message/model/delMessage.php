<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['idMessage'])){

            $message = new Message();

            $message->setId(strip_tags($_REQUEST['idMessage']));

            $data = $message->del();

            echo json_encode($data);

        }

    }

?>