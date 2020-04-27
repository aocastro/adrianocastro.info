<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['idMessage'])){

            $message = new Message();

            $message->setId(strip_tags($_REQUEST['idMessage']));
            $message->setTitle(strip_tags($_REQUEST['titleMessage']));
            // $message->setText(strip_tags($_REQUEST['textMessage']));
            // $message->setType(strip_tags($_REQUEST['typeMessage']));
            // $message->setStatus(strip_tags($_REQUEST['statusMessage']));
            // $message->setUserId($_SESSION['adm']);

            $data = $message->edit();

            echo json_encode($data);

        }

    }

?>