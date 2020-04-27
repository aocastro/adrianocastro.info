<?php
session_start();

if(isset($_SESSION['etechday'])){
    $return = array('msg' => true);
}else{
    $return = array('msg' => false);
}

echo json_encode($return);
?>