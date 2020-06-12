<?php

    include('../../connection/conn.php');

    $idUsers = $_REQUEST['idUsers'];

    $sql = "DELETE FROM AGUAVIVA_USERS WHERE idUsers=$idUsers";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Usuário excluído com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir o usuário, pois o mesmo está sendo utilizado em outros registros.'
        );
    }

    echo json_encode($dados);