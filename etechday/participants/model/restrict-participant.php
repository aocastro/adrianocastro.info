<?php

if($_POST['login'] == 'etechday' && $_POST['senha'] == '3t3chd@y'){
    session_start();
    $_SESSION['etechday'] = $_POST['login'];
    $return = array('mensagem' => 't3cn0log1@');
}else{
    include('../../connection/conn.php');

    $sql = $pdo->query("SELECT *, count(id) as achou FROM TECHDAY_PARTICIPANT WHERE login = '".$_POST['login']."' AND senha = '".md5($_POST['senha'])."'");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        if($resultado['achou'] == 1){
            session_start();
            $_SESSION['id'] = $resultado['id'];
            $_SESSION['nome'] = $resultado['nome'];
            $return = array('mensagem' => true);
        }else{
            $return = array('mensagem' => 'Login ou senha incorretos!');
        }
    }
}

echo json_encode($return);

?>