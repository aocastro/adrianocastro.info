<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_USERS (nameUsers, loginUsers, passwordUsers) VALUES (:name, :login, :password)');
    $stmt->execute(array(
        ':name' => utf8_decode($_POST['nameUsers']),
        ':login' => $_POST['loginUsers'],
        ':password' => md5($_POST['passwordUsers'])
    ));
    $retorno = array('mensagem' => true);
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

echo json_encode($retorno);

?>