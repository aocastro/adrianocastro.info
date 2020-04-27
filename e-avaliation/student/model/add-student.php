<?php
include('../../conexao/conn.php');
try {
    $stmt = $pdo->prepare('INSERT INTO WORK_STUDENT (nameStudent, work_school_idSchool, work_course_idCourse) 
                            VALUES (:nameStudent, :work_school_idSchool, :work_course_idCourse)');
    $stmt->execute(array(
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