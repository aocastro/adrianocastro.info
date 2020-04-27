<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        $data = Message::list();

        echo json_encode($data);

    }

?>