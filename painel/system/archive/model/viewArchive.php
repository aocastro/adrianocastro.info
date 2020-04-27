<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['idArchive'])){

            $data = Archive::view(strip_tags($_REQUEST['idArchive']));

            echo json_encode($data);

        }

    }

?>