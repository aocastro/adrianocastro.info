<?php

    include('../../connection/conn.php');

    $idPay = $_REQUEST['idPay'];

    $sql = "SELECT f.idProvider, f.nameProvider, p.idPay, datePay as vencimento, p.valuePay, p.valuePay, p.discountPay, p.additionPay, p.amountPaid, p.status 
            FROM AGUAVIVA_PAY p, AGUAVIVA_PROVIDER f 
            WHERE p.AGUAVIVA_PROVIDER_idProvider = f.idProvider AND p.idPay = $idPay";
    
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
            'mensagem' => 'Não foi possível obter a conta.',
            'dados' => array()
        );
    }


    echo json_encode($dados);