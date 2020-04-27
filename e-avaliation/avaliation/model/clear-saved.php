<?php
include('../../conexao/conn.php');

session_start();

$sql = $pdo->query("SELECT * FROM WORK_AVALIATION WHERE work_teacher_idTeacher = ".$_SESSION['idTeacher']." GROUP BY work_project_idProject");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>