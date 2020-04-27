<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PROOF where status = 1");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>