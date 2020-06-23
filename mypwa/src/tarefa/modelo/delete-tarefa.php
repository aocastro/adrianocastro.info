<?php

    include('../../conexao/banco.php');

    $id = $_REQUEST['id'];

    $sql = "DELETE FROM MYPWA_TAREFA WHERE id=$id";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Tarefa excluída com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir a tarefa.'
        );
    }

    echo json_encode($dados);