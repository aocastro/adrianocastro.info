<?php

    include('../../connection/conn.php');

    $idProvider = $_REQUEST['idProvider'];

    $sql = "SELECT * FROM AGUAVIVA_PROVIDER WHERE idProvider=$idProvider";
    
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
            'mensagem' => 'Não foi possível obter o fornecedor.',
            'dados' => array()
        );
    }


    echo json_encode($dados);