<?php
include('../../conexao/conn.php');

session_start();

$date = date('Y-m-d');

try {
    $stmt = $pdo->prepare('INSERT INTO WORK_AVALIATION (dateAvaliation, work_teacher_idTeacher, work_project_idProject, work_item_avaliation_idItem_avaliation, mentionAvaliation) VALUES (:dateAvaliation, :work_teacher_idTeacher, :work_project_idProject, :work_item_avaliation_idItem_avaliation, :mentionAvaliation)');
    $stmt->execute(array(
        ':dateAvaliation' => $date,
        ':work_teacher_idTeacher' => $_SESSION['idTeacher'],
        ':work_project_idProject' => $_REQUEST['work_project_idProject'],
        ':work_item_avaliation_idItem_avaliation' => $_REQUEST['work_item_avaliation_idItem_avaliation'],
        ':mentionAvaliation' => $_REQUEST['avaliation']
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>