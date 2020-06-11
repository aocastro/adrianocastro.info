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
            'mensagem' => 'Não foi possível excluir a forma de pagamento, , pois o mesmo está sendo utilizado em registro de mensalidades.'
        );
    }

    echo json_encode($dados);