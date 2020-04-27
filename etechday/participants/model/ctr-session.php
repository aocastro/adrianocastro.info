<?php

session_start();

if(isset($_SESSION['id'])){
    $return = array('mensagem' => true);
}

echo json_encode($return);

?>