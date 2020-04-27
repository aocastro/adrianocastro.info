<?php
include('../../connection/conn.php');

session_start();

if(isset($_SESSION['idUsers'])){
    
    $sql = $pdo->query("SELECT s.nameStudents, p.namePayment, t.amountPaid FROM AGUAVIVA_TUITION t, AGUAVIVA_STUDENTS s, AGUAVIVA_PAYMENT_METHODS p
                        WHERE statusPayment = 2 
                        AND t.AGUAVIVA_STUDENTS_idStudents = s.idStudents
                        AND t.AGUAVIVA_PAYMENT_METHODS_idPayment = p.idPayment
                        AND t.paymentDate BETWEEN '".$_POST['dateInitial']."' AND '".$_POST['dateFinish']."'");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
    
    echo json_encode($return);

}


?>