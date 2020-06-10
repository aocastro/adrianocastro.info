<?php

    include('../../connection/conn.php');

    $idPayment = $_REQUEST['idPayment'];

    $sql = "SELECT * FROM AGUAVIVA_PAYMENT_METHODS 
            WHERE idPayment=$idPayment";
    
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
            'mensagem' => 'Não foi possível obter a forma de pagamento.',
            'dados' => array()
        );
    }


    echo json_encode($dados);