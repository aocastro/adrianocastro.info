<?php

include('../../connection/conn.php');

    session_start();

    $dateInitial = '2020-01-01';
    $dateFinish = date('Y-m-d');

    if(isset($_SESSION['idUsers'])){
        
        $dados = array();

        $sql = "SELECT sum(grossValue) as total FROM AGUAVIVA_TUITION WHERE statusPayment = 1 AND dueDate BETWEEN '".$dateInitial."' AND '".$dateFinish."'";

        $resultado = $pdo->query($sql);

        if($resultado){
            
            while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
                $dados[] = array_map('utf8_encode', $row);
            }
            
        }

        echo json_encode($dados);

    }