<?php
    session_start();
    include('../../config.php');
    if (isset($_SESSION['adm'])) {

        $data = User::list();
        echo json_encode($data);

    }

?>