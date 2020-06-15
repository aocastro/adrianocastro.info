<?php

    include('../../connection/conn.php');

    $idProvider = $_REQUEST['idProvider'];

    $sql = "DELETE FROM AGUAVIVA_PROVIDER WHERE idProvider=$idProvider";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Fornecedor excluído com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir o fornecedor, pois o mesmo está sendo utilizado em registro do contas a pagar.'
        );
    }

    echo json_encode($dados);