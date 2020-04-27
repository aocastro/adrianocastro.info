<?php
include('../../conexao/conn.php');

$sql = $pdo->query("SELECT COUNT(*) AS TOTAL FROM WORK_STUDENT");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $data[] = array_map('utf8_encode', $resultado);
}

echo json_encode($data);

?>