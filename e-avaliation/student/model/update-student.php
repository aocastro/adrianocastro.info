<?php
include('../../conexao/conn.php');
try {
    $stmt = $pdo->prepare('UPDATE WORK_STUDENT SET nameStudent = :nameStudent, work_school_idSchool = :work_school_idSchool, work_course_idCourse = :work_course_idCourse WHERE idStudent = :idStudent');
    $stmt->execute(array(
        ':idStudent' => $_POST['idStudent'],
        ':nameStudent' => utf8_decode($_POST['nameStudent']),
        ':work_school_idSchool' => $_POST['work_school_idSchool'],
        ':work_course_idCourse' => $_POST['work_course_idCourse']
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>