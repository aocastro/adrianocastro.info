<?php

session_start();

if(isset($_SESSION['id'])){
    session_destroy();
    $return = array('mensagem' => true);
}

echo json_encode($return);

?>