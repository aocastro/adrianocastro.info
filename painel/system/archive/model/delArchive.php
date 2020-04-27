<?php

    session_start();

    include('../../config.php');

    if (isset($_SESSION['adm'])) {

        if (isset($_REQUEST['idArchive'])){

            $archive = new Archive();

            $archive->setId(strip_tags($_REQUEST['idArchive']));

            $data = $archive->del();

            echo json_encode($data);

        }

    }

?>