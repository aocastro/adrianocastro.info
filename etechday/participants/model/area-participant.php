<?php
include('../../connection/conn.php');
session_start();

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT where id = ".$_SESSION['id']."");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>