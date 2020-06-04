<?php
include('../../connection/conn.php');
session_start();

try {
    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_PAYMENT_METHODS (namePayment) VALUES (:a)');
    $stmt->execute(array(
        ':a' => utf8_decode($_POST['namePayment'])
    ));

    $retorno = array('mensagem' => true);
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

echo json_encode($retorno);

?>