<?php
include('../../conexao/conn.php');


$sql = $pdo->query("SELECT WORK_TEACHER.idTeacher, WORK_TEACHER.nameTeacher, WORK_PROJECT.idProject, WORK_PROJECT.nameProject
FROM WORK_TEACHER, WORK_PROJECT, WORK_COMMENT
WHERE WORK_TEACHER.idTeacher = WORK_COMMENT.work_teacher_idTeacher
AND WORK_PROJECT.idProject = WORK_COMMENT.work_project_idProject
ORDER BY WORK_PROJECT.idProject;");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>