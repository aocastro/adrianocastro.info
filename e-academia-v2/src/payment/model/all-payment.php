<?php

    include('../../connection/conn.php');

    $dados = array();


    $sql = "SELECT * FROM AGUAVIVA_PAYMENT_METHODS ORDER BY namePayment ASC";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);