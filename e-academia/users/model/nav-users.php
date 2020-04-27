<?php
include('../../connection/conn.php');

session_start();

$sql = $pdo->query("SELECT * FROM AGUAVIVA_USERS WHERE idUsers = ".$_SESSION['idUsers']." ");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>