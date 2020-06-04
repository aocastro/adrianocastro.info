<?php
include('../../connection/conn.php');

if(isset($_POST['idStudents'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS S, AGUAVIVA_SERVICES V WHERE S.AGUAVIVA_SERVICES_idServices = V.idServices AND idStudents = ".$_POST['idStudents']."");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }   
}else if(isset($_POST['name'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS WHERE nameStudents LIKE '%".utf8_decode($_POST['name'])."%'");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}else{
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}


echo json_encode($return);

?>