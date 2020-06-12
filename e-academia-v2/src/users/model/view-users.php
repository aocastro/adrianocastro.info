<?php

    include('../../connection/conn.php');

    $idUsers = $_REQUEST['idUsers'];

    $sql = "SELECT * FROM AGUAVIVA_USERS 
            WHERE idUsers=$idUsers";
    
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
            'mensagem' => 'Não foi possível obter o usuário.',
            'dados' => array()
        );
    }


    echo json_encode($dados);