<?php
include('../../conexao/conn.php');

try {
    $stmt = $pdo->prepare('UPDATE WORK_ITEM_AVALIATION SET categoryItem_avaliation = :categoryItem_avaliation, subgroupItem_avaliation = :subgroupItem_avaliation, descriptionItem_avaliation = :descriptionItem_avaliation WHERE idItem_avaliation = :idItem_avaliation');
    $stmt->execute(array(
        ':idItem_avaliation' => $_POST['idItem_avaliation'],
        ':categoryItem_avaliation' => utf8_decode($_REQUEST['categoryItem_avaliation']),
        ':subgroupItem_avaliation' => utf8_decode($_REQUEST['subgroupItem_avaliation']),
        ':descriptionItem_avaliation' => utf8_decode($_REQUEST['descriptionItem_avaliation'])
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>