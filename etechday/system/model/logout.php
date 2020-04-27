<?php
session_start();

session_destroy();

$return = array('msg' => true);

echo json_encode($return);
?>