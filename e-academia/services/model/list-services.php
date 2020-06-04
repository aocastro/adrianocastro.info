<?php
include('../../connection/conn.php');

if(isset($_POST['idServices'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES WHERE idServices = ".$_POST['idServices']."");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }   
}else if(isset($_POST['name'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES WHERE nameServices LIKE '%".$_POST['name']."%'");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}else{
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}


echo json_encode($return);

?>