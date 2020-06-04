<?php
include('../../connection/conn.php');

session_start();

try {
    $stmt = $pdo->prepare('UPDATE AGUAVIVA_PAYMENT_METHODS SET namePayment = :a WHERE idPayment = :idPayment');
    $stmt->execute(array(
    ':idPayment' => $_POST['idPayment'],
    ':a' => utf8_decode($_POST['namePayment'])
    ));

    $data = array('mensagem' => true);
} catch(PDOException $e) {
    $data = array('mensagem' => $e->getMessage());
}

echo json_encode($data);
?>