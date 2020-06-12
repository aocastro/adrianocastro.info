<?php

    include('../../connection/conn.php');

    $idTuition = $_REQUEST['idTuition'];

    $sql = "SELECT s.nameStudents, t.idTuition, DATE_FORMAT(t.dueDate, '%d/%m/%Y') as vencimento, t.grossValue 
    FROM AGUAVIVA_STUDENTS s, AGUAVIVA_TUITION t WHERE s.idStudents = t.AGUAVIVA_STUDENTS_idStudents AND t.idTuition = $idTuition";
    
    $resultado = $pdo->query($sql);
    if($resultado){
        $dadosTipo = array();
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dadosTipo = array_map('utf8_encode', $row);
        }
        $dados = array(
            'tipo' => 'success',
            'mensagem' => '',
            'dados' => $dadosTipo
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível obter o serviço.',
            'dados' => array()
        );
    }


    echo json_encode($dados);