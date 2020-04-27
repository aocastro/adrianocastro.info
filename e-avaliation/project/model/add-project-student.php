<?php
include('../../conexao/conn.php');

try {
    $stmt = $pdo->prepare('INSERT INTO WORK_STUDENT_PROJECT (work_project_idProject, work_student_idStudent) VALUES (:work_project_idProject, :work_student_idStudent)');
    $stmt->execute(array(
        ':work_project_idProject' => $_REQUEST['work_project_idProject'],
        ':work_student_idStudent' => $_REQUEST['work_student_idStudent']
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>