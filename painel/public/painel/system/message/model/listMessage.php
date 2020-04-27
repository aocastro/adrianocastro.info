<?php

    session_start();

    $_SESSION['adm'] = 1;

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        $data = Message::list();

        echo json_encode($data);

    }

?>