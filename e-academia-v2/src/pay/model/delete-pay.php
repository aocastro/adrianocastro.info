<?php

    include('../../connection/conn.php');

    $idPay = $_REQUEST['idPay'];

    $sql = "DELETE FROM AGUAVIVA_PAY WHERE idPay=$idPay";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Conta excluída com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir a conta.'
        );
    }

    echo json_encode($dados);