<?php
include('../../connection/conn.php');

date_default_timezone_set('America/Sao_Paulo');

$dia = date('d');
$mes = date('m');
$ano = date('Y');

$paymentDate = $ano."-".$mes."-".$dia;

try {
    $stmt = $pdo->prepare('UPDATE AGUAVIVA_TUITION SET paymentDate = :a, discount = :b, amountPaid = :c, statusPayment = :d, AGUAVIVA_PAYMENT_METHODS_idPayment = :e WHERE idTuition = :id');
    $stmt->execute(array(
    ':id' => $_POST['idTuition'],
    ':a' => $paymentDate,
    ':b' => $_POST['discount'],
    ':c' => $_POST['amountPaid'],
    ':d' => 2,
    ':e' => $_POST['AGUAVIVA_PAYMENT_METHODS_idPayment']
    ));

    // Procedimento para gerar a próxima mensalidade

    // Consultando o aluno
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS WHERE idStudents = ".$_POST['idStudents']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $idStudents = $resultado['idStudents'];
        $AGUAVIVA_SERVICES_idServices = $resultado['AGUAVIVA_SERVICES_idServices'];
        $paydayStudents = $resultado['paydayStudents'];
    }

    // Início da busca do valor da mensalidade
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES WHERE idServices = ".$AGUAVIVA_SERVICES_idServices."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $valueServices = $resultado['valueServices'];
    }

    $dia = $paydayStudents;
    $mes = date('m');
    $ano = date('Y');

    if($mes == 12){
        $mes = 1;
    }else{
        $mes = $mes + 1;
    }

    $dueDate = $ano."-".$mes."-".$dia;

    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_TUITION (dueDate, grossValue, statusPayment, AGUAVIVA_STUDENTS_idStudents) 
                                                    VALUES (:a, :b, :c, :d)');
    $stmt->execute(array(
        ':a' => $dueDate,
        ':b' => $valueServices,
        ':c' => 1,
        ':d' => $idStudents
        ));


    $data = array('mensagem' => true);
} catch(PDOException $e) {
    $data = array('mensagem' => $e->getMessage());
}

echo json_encode($data);
?>