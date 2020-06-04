<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_SERVICES (nameServices, valueServices) VALUES (:a, :b)');
    $stmt->execute(array(
        ':a' => utf8_decode($_POST['nameServices']),
        ':b' => $_POST['valueServices']
    ));
    $retorno = array('mensagem' => true);
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

echo json_encode($retorno);

?>