<?php

include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT where id = ".$_POST['id']."");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>