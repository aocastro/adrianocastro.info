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

if(isset($_REQUEST['idQuestion'])){

    $sql = $pdo->query("SELECT * FROM WORK_ITEM_AVALIATION WHERE idItem_avaliation = ".$_REQUEST['idQuestion']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else if(isset($_REQUEST['search'])){

    $sql = $pdo->query("SELECT * FROM WORK_ITEM_AVALIATION WHERE descriptionItem_avaliation LIKE '%".$_REQUEST['search']."%' LIMIT 3");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}else{

    if($pagina > 0){
        $sql = $pdo->query("SELECT * FROM WORK_ITEM_AVALIATION ORDER BY idItem_avaliation DESC LIMIT ".$limite.", ".$porPagina."");
    }else{
        $sql = $pdo->query("SELECT * FROM WORK_ITEM_AVALIATION ORDER BY idItem_avaliation DESC");
    }
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }

}

echo json_encode($return);

?>