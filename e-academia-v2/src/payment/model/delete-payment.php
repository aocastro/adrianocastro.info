<?php

    include('../../connection/conn.php');

    $idPayment = $_REQUEST['idPayment'];

    $sql = "DELETE FROM AGUAVIVA_PAYMENT_METHODS WHERE idPayment=$idPayment";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Forma de pagamento excluída com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir a forma de pagamento.'
        );
    }

    echo json_encode($dados);