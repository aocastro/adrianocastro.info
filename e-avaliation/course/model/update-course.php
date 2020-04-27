<?php
include('../../conexao/conn.php');
try {
    $stmt = $pdo->prepare('UPDATE WORK_COURSE SET nameCourse = :nameCourse WHERE idCourse = :idCourse');
    $stmt->execute(array(
        ':idCourse' => $_POST['idCourse'],
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