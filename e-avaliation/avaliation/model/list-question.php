<?php
include('../../conexao/conn.php');


$sql = $pdo->query("SELECT * FROM WORK_ITEM_AVALIATION ORDER BY categoryItem_avaliation");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>