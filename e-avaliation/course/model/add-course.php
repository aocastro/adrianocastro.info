<?php
include('../../conexao/conn.php');
try {
    $stmt = $pdo->prepare('INSERT INTO WORK_COURSE (nameCourse) VALUES (:nameCourse)');
    $stmt->execute(array(
    ':nameCourse' => utf8_decode($_POST['nameCourse'])
));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>