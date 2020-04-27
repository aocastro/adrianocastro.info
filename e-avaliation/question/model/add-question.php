<?php
include('../../conexao/conn.php');

if(strlen($_REQUEST['nameCategory']) > 1){
    $categoryItem_avaliation = $_REQUEST['nameCategory'];
}else{
    $categoryItem_avaliation = $_REQUEST['categoryItem_avaliation'];
}

if(strlen($_REQUEST['nameSubgroup']) > 1){
    $subgroupItem_avaliation = $_REQUEST['nameSubgroup'];
}else{
    $subgroupItem_avaliation = $_REQUEST['subgroupItem_avaliation'];
}

$categoryItem_avaliation = utf8_decode($categoryItem_avaliation);
$subgroupItem_avaliation = utf8_decode($subgroupItem_avaliation);

$descriptionItem_avaliation = $_REQUEST['descriptionItem_avaliation'];
$descriptionItem_avaliation = utf8_decode($descriptionItem_avaliation);

try {
    $stmt = $pdo->prepare('INSERT INTO WORK_ITEM_AVALIATION (categoryItem_avaliation, subgroupItem_avaliation, descriptionItem_avaliation) VALUES (:categoryItem_avaliation, :subgroupItem_avaliation, :descriptionItem_avaliation)');
    $stmt->execute(array(
        ':categoryItem_avaliation' => $categoryItem_avaliation,
        ':subgroupItem_avaliation' => $subgroupItem_avaliation,
        ':descriptionItem_avaliation' => $descriptionItem_avaliation
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>