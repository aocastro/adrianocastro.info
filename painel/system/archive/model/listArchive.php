<?php
    session_start();

    if (isset($_SESSION['adm'])) {
        
        $data = Archive::list();

        echo json_encode($data);
    }

?>