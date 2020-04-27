<?php
include('../../conexao/conn.php');

session_start();

try {
    $stmt = $pdo->prepare('INSERT INTO WORK_COMMENT (descriptionComment, work_teacher_idTeacher, work_project_idProject) VALUES (:descriptionComment, :work_teacher_idTeacher, :work_project_idProject)');
    $stmt->execute(array(
        ':descriptionComment' => $_REQUEST['descriptionComment'],
        ':work_teacher_idTeacher' => $_SESSION['idTeacher'],
        ':work_project_idProject' => $_REQUEST['work_project_idProject']
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>