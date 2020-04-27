<?php
include('../../conexao/conn.php');

if(isset($_REQUEST['pagination'])){
    $pagination = $_REQUEST['pagination'];
    $paginacao = json_decode($pagination, true);
    $pagina = $paginacao['pagina'];
    $porPagina = $paginacao['porpagina'];
    $limite = ($pagina - 1) * $porPagina;
}

if(isset($_REQUEST['idTeacher'])){

    $sql = $pdo->query("SELECT * FROM WORK_TEACHER t, WORK_SCHOOL s WHERE t.work_school_idSchool = s.idSchool AND t.idTeacher = ".$_REQUEST['idTeacher']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else if(isset($_REQUEST['search'])){

    $sql = $pdo->query("SELECT * FROM WORK_TEACHER t, WORK_SCHOOL s WHERE t.work_school_idSchool = s.idSchool AND t.nameTeacher LIKE '%".$_REQUEST['search']."%' LIMIT 3");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else{

    if($pagina > 0){
        $sql = $pdo->query("SELECT * FROM WORK_TEACHER t, WORK_SCHOOL s WHERE t.work_school_idSchool = s.idSchool ORDER BY t.idTeacher DESC LIMIT ".$limite.", ".$porPagina."");
    }else{
        $sql = $pdo->query("SELECT * FROM WORK_TEACHER t, WORK_SCHOOL s WHERE t.work_school_idSchool = s.idSchool ORDER BY t.idTeacher DESC");
    }
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}

echo json_encode($return);

?>