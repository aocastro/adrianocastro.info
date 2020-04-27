<?php
include('../../connection/conn.php');

if(isset($_POST['idStudents'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_PAYMENT_METHODS WHERE idPayment = ".$_POST['idPayment']."");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }   
}else if(isset($_POST['name'])){
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_PAYMENT_METHODS WHERE namePayment LIKE '%".$_POST['name']."%'");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}else{
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_PAYMENT_METHODS");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}


echo json_encode($return);

?>