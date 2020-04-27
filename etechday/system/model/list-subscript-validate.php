<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT where status = 3 ORDER BY id ASC");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);
?>