<?php
include('../../conexao/conn.php');


$sql = $pdo->query("SELECT * FROM WORK_STUDENT, WORK_STUDENT_PROJECT WHERE WORK_STUDENT.idStudent = WORK_STUDENT_PROJECT.work_student_idStudent AND WORK_STUDENT_PROJECT.work_project_idProject = ".$_REQUEST['idProject']."");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>