<?php

    include('../../connection/conn.php');

    $idStudents = $_REQUEST['idStudents'];

    $pdo->query("DELETE FROM AGUAVIVA_TUITION WHERE AGUAVIVA_STUDENTS_idStudents = $idStudents");

    $sql = "DELETE FROM AGUAVIVA_STUDENTS WHERE idStudents=$idStudents";

    $resultado = $pdo->query($sql);
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Aluno excluído com sucesso.'
        );
    } else{
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir o aluno.'
        );
    }

    echo json_encode($dados);