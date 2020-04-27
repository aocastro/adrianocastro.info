<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['titleMessage'])){

            $message = new Message();

            $message->setTitle(strip_tags($_REQUEST['titleMessage']));
            $message->setText(strip_tags($_REQUEST['textMessage']));
            $message->setType(strip_tags($_REQUEST['typeMessage']));
            $message->setStatus(strip_tags($_REQUEST['statusMessage']));
            $message->setTime(strip_tags($_REQUEST['timeMessage']));
            $message->setUserId($_SESSION['adm']);

            $data = $message->insert();

            echo json_encode($data);

        }

    }

?>