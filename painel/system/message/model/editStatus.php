<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['statusMessage'])){

            $message = new Message();

            $message->setId($_REQUEST['idMessage']);

            if ($_REQUEST['statusMessage'] == 1) {

                $data = $message->enableMessage();

            } else {

                $data = $message->desableMessage();

            }

            echo json_encode($data);

        }

    }

?>