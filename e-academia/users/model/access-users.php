<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT *, count(idUsers) as achou FROM AGUAVIVA_USERS WHERE loginUsers = '".$_POST['loginUsers']."' AND passwordUsers = '".md5($_POST['passwordUsers'])."'");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    if($resultado['achou'] == 1){
        session_start();
        $_SESSION['idUsers'] = $resultado['idUsers'];
        $_SESSION['nameUsers'] = $resultado['nameUsers'];
        $return = array('mensagem' => true);
    }else{
        $return = array('mensagem' => 'Login ou senha incorretos!');
    }
}

echo json_encode($return);

?>