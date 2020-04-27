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

if(isset($_REQUEST['idProject'])){

    $sql = $pdo->query("SELECT * FROM WORK_PROJECT WHERE idProject = ".$_REQUEST['idProject']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else if(isset($_REQUEST['search'])){

    $sql = $pdo->query("SELECT * FROM WORK_PROJECT WHERE nameProject LIKE '%".$_REQUEST['search']."%' LIMIT 3");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else{

    if($pagina > 0){
        $sql = $pdo->query("SELECT * FROM WORK_PROJECT ORDER BY idProject DESC LIMIT ".$limite.", ".$porPagina."");
    }else{
        $sql = $pdo->query("SELECT * FROM WORK_PROJECT ORDER BY idProject DESC");
    }
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}

echo json_encode($return);

?>