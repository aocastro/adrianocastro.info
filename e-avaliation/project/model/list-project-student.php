<?php
include('../../conexao/conn.php');

$sql = $pdo->query("SELECT * FROM WORK_STUDENT_PROJECT sp, WORK_STUDENT s WHERE sp.work_project_idProject = ".$_REQUEST['idProject']." AND sp.work_student_idStudent = s.idStudent");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>