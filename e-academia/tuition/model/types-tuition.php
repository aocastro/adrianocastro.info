<?php
include('../../connection/conn.php');

session_start();

if(isset($_SESSION['idUsers'])){
    
    $sql = $pdo->query("SELECT M.namePayment, sum(amountPaid) as total FROM AGUAVIVA_TUITION T, AGUAVIVA_PAYMENT_METHODS M
    WHERE T.AGUAVIVA_PAYMENT_METHODS_idPayment = M.idPayment AND T.statusPayment = 2 AND T.paymentDate BETWEEN '".$_POST['dateInitial']."' AND '".$_POST['dateFinish']."'
    GROUP BY T.AGUAVIVA_PAYMENT_METHODS_idPayment");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
    
    echo json_encode($return);

}


?>