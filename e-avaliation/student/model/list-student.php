<?php
include('../../conexao/conn.php');

if(isset($_REQUEST['pagination'])){
    $pagination = $_REQUEST['pagination'];
    $paginacao = json_decode($pagination, true);
    $pagina = $paginacao['pagina'];
    $porPagina = $paginacao['porpagina'];
    $limite = ($pagina - 1) * $porPagina;
}else{
    $pagina = 0;
}

if(isset($_REQUEST['idStudent'])){

    $sql = $pdo->query("SELECT * FROM WORK_STUDENT t, WORK_SCHOOL s, WORK_COURSE c WHERE t.work_school_idSchool = s.idSchool AND t.work_course_idCourse = c.idCourse AND t.idStudent = ".$_REQUEST['idStudent']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else if(isset($_REQUEST['search'])){

    $sql = $pdo->query("SELECT * FROM FROM WORK_STUDENT t, WORK_SCHOOL s, WORK_COURSE c WHERE t.work_school_idSchool = s.idSchool AND t.work_course_idCourse = c.idCourse AND t.nameStudent LIKE '%".$_REQUEST['search']."%' LIMIT 3");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else{

    if($pagina > 0){
        $sql = $pdo->query("SELECT * FROM WORK_STUDENT t, WORK_SCHOOL s, WORK_COURSE c WHERE t.work_school_idSchool = s.idSchool AND t.work_course_idCourse = c.idCourse ORDER BY t.idStudent DESC LIMIT ".$limite.", ".$porPagina."");
    }else{
        $sql = $pdo->query("SELECT * FROM WORK_STUDENT t, WORK_SCHOOL s, WORK_COURSE c WHERE t.work_school_idSchool = s.idSchool AND t.work_course_idCourse = c.idCourse ORDER BY t.idStudent DESC");
    }
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}

echo json_encode($return);

?>