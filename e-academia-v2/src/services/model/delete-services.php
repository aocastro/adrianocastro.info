<?php

    include('../../connection/conn.php');

    $idServices = $_REQUEST['idServices'];

    $sql = "DELETE FROM AGUAVIVA_SERVICES WHERE idServices=$idServices";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Serviço excluído com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir o serviço.'
        );
    }

    echo json_encode($dados);