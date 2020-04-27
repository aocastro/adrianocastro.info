<?php

include('../../connection/conn.php');

$sql = $pdo->query("SELECT *, count(id) as achou FROM TECHDAY_PARTICIPANT WHERE email = '".$_POST['email']."' AND nascimento = '".$_POST['nascimento']."'");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    if($resultado['achou'] == 1){

        try {
            $stmt = $pdo->prepare('UPDATE TECHDAY_PARTICIPANT SET senha = :senha WHERE id = :id');
            $stmt->execute(array(
                ':id'   => $resultado['id'],
                ':senha' => md5($resultado['login'])
            ));
            $return = array('mensagem' => 'Seu login é: '.$resultado['login'].' e sua nova senha é: '.$resultado['login']);
        } catch(PDOException $e) {
            $return = array('msg' => getMessage());
        }

    }else{
        $return = array('mensagem' => 'Os dados informados não correspondem a nenhum participante cadastrado!');
    }
}

echo json_encode($return);

?>