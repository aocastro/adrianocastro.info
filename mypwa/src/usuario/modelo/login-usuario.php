<?php
include('../../conexao/banco.php');

$sql = $pdo->query("SELECT *, count(id) as achou FROM MYPWA_USUARIO WHERE login = '".$_REQUEST['login']."' AND senha = '".md5($_REQUEST['senha'])."'");

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

echo json_encode($return);

?>