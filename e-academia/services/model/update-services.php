<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('UPDATE AGUAVIVA_SERVICES SET nameServices = :a, valueServices = :b WHERE idServices = :id');
    $stmt->execute(array(
    ':id' => $_POST['idServices'],
    ':a' => utf8_decode($_POST['nameServices']),
    ':b' => $_POST['valueServices']
    ));

    $data = array('mensagem' => true);
} catch(PDOException $e) {
    $data = array('mensagem' => $e->getMessage());
}

echo json_encode($data);
?>