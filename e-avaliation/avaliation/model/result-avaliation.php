<?php
include('../../conexao/conn.php');


$sql = $pdo->query("SELECT DATE_FORMAT(WORK_AVALIATION.dateAvaliation, '%d/%m/%Y') as dateFormat, WORK_AVALIATION.mentionAvaliation, WORK_TEACHER.idTeacher,  WORK_TEACHER.nameTeacher, WORK_PROJECT.idProject, WORK_PROJECT.nameProject, WORK_ITEM_AVALIATION.categoryItem_avaliation, WORK_ITEM_AVALIATION.subgroupItem_avaliation, WORK_ITEM_AVALIATION.descriptionItem_avaliation, WORK_COMMENT.descriptionComment 
FROM WORK_AVALIATION, WORK_TEACHER, WORK_PROJECT, WORK_ITEM_AVALIATION, WORK_COMMENT
WHERE WORK_AVALIATION.work_teacher_idTeacher = WORK_TEACHER.idTeacher
AND WORK_AVALIATION.work_item_avaliation_idItem_avaliation = WORK_ITEM_AVALIATION.idItem_avaliation
AND WORK_COMMENT.work_project_idProject = WORK_PROJECT.idProject
AND WORK_AVALIATION.work_project_idProject = WORK_PROJECT.idProject
AND WORK_COMMENT.work_project_idProject = WORK_PROJECT.idProject
AND WORK_PROJECT.idProject = ".$_REQUEST['idProject']."
AND WORK_TEACHER.idTeacher = ".$_REQUEST['idTeacher']."
GROUP BY WORK_ITEM_AVALIATION.descriptionItem_avaliation");
    
while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>