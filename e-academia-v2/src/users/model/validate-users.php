<?php

    session_start();

    if(!$_SESSION['idUsers']){
        $dados = array('mensagem' => false);
    }else{
        $dados = array('mensagem' => true, 'user' => $_SESSION['nameUsers']);
    }

    echo json_encode($dados);