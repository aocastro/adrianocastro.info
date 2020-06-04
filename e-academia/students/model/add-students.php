<?php
include('../../connection/conn.php');
session_start();

try {
    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_STUDENTS (nameStudents, sexStudents, addressStudents, cityStudents, birthStudents, phoneStudents, celularStudents, AGUAVIVA_SERVICES_idServices, paydayStudents, AGUAVIVA_USERS_idUsers, emailStudents) 
                                                    VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :l)');
    $stmt->execute(array(
        ':a' => utf8_decode($_POST['nameStudents']),
        ':b' => $_POST['sexStudents'],
        ':c' => utf8_decode($_POST['addressStudents']),
        ':d' => utf8_decode($_POST['cityStudents']),
        ':e' => $_POST['birthStudents'],
        ':f' => $_POST['phoneStudents'],
        ':g' => $_POST['celularStudents'],
        ':h' => $_POST['AGUAVIVA_SERVICES_idServices'],
        ':i' => $_POST['paydayStudents'],
        ':j' => $_SESSION['idUsers'],
        ':l' => $_POST['emailStudents']
    ));

    // Início da busca do id cadastrado
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS ORDER BY idStudents DESC LIMIT 1");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $idStudents = $resultado['idStudents'];
    }
    // Fim da busca do id do cadastro

    // Início da busca do valor da mensalidade
    $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES WHERE idServices = ".$_POST['AGUAVIVA_SERVICES_idServices']."");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $valueServices = $resultado['valueServices'];
    }
    // Fim da busca do valor da mensalidade

    // Procedimento para gerar a primeira mensalidade
    $dia = $_POST['paydayStudents'];
    $mes = date('m');
    $ano = date('Y');

    $dueDate = $ano."-".$mes."-".$dia;

    $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_TUITION (dueDate, grossValue, statusPayment, AGUAVIVA_STUDENTS_idStudents) 
                                                    VALUES (:a, :b, :c, :d)');
    $stmt->execute(array(
        ':a' => $dueDate,
        ':b' => $valueServices,
        ':c' => 1,
        ':d' => $idStudents
        ));

    $retorno = array('mensagem' => true);
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

echo json_encode($retorno);

?>