<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT WHERE status = 1 OR status = 2 ORDER BY nome ASC");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>