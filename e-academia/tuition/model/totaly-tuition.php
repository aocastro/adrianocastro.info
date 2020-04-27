<?php
include('../../connection/conn.php');

session_start();

if(isset($_SESSION['idUsers'])){
    
    $sql = $pdo->query("SELECT sum(amountPaid) as total FROM AGUAVIVA_TUITION 
                        WHERE statusPayment = 2 AND paymentDate BETWEEN '".$_POST['dateInitial']."' AND '".$_POST['dateFinish']."'");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
    
    echo json_encode($return);

}


?>