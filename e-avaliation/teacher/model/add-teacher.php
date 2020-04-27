<?php
include('../../conexao/conn.php');
try {
    $stmt = $pdo->prepare('INSERT INTO WORK_TEACHER (nameTeacher, loginTeacher, passwordTeacher, typeUser, work_school_idSchool) 
                            VALUES (:nameTeacher, :loginTeacher, :passwordTeacher, :typeUser, :work_school_idSchool)');
    $stmt->execute(array(
    ':nameTeacher' => utf8_decode($_POST['nameTeacher']),
    ':loginTeacher' => $_POST['loginTeacher'],
    ':passwordTeacher' => md5($_POST['passwordTeacher']),
    ':typeUser' => $_POST['typeUser'],
    ':work_school_idSchool' => $_POST['work_school_idSchool']
));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>