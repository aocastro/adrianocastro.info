<?php
include('../../conexao/conn.php');


$sql = $pdo->query("SELECT * FROM WORK_STUDENT_PROJECT");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>