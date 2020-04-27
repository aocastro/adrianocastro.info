<?php
$descricao = $_POST['descricao'];
$descricao = preg_replace("/(\\r)?\\n/i", "<br/>", $descricao);
$descricao = utf8_decode($descricao);
$nome = $_POST['nome'];
$nome = utf8_decode($nome);

// echo $nome.'<br>'.$descricao;

include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('INSERT INTO TECHDAY_PROOF (nome, descricao, status) VALUES (:nome, :descricao, :status)');
    $stmt->execute(array(
        ':nome' => $nome,
        ':descricao' => $descricao,
        ':status' => 1
    ));
    $retorno = array('mensagem' => true);
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

echo json_encode($retorno);

?>