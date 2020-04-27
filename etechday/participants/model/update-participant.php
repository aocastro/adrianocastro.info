<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT WHERE id = ".$_POST['id']."");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    if(strlen($_POST['senha']) < 1){
        try {
            $stmt = $pdo->prepare('UPDATE TECHDAY_PARTICIPANT SET nome = :a, email = :b, responsavel = :c, nascimento = :d, login = :e WHERE id = :id');
            $stmt->execute(array(
                ':id'   => $_POST['id'],
                ':a' => utf8_decode($_POST['nome']),
                ':b' => $_POST['email'],
                ':c' => utf8_decode($_POST['responsavel']),
                ':d' => $_POST['nascimento'],
                ':e' => $_POST['login']
            ));
            $return = array('mensagem' => true);
        } catch(PDOException $e) {
            $return = array('mensagem' => getMessage());
        }
    }else{
        try {
            $stmt = $pdo->prepare('UPDATE TECHDAY_PARTICIPANT SET nome = :a, email = :b, responsavel = :c, nascimento = :d, login = :e, senha = :f WHERE id = :id');
            $stmt->execute(array(
                ':id'   => $_POST['id'],
                ':a' => utf8_decode($_POST['nome']),
                ':b' => $_POST['email'],
                ':c' => utf8_decode($_POST['responsavel']),
                ':d' => $_POST['nascimento'],
                ':e' => $_POST['login'],
                ':f' => md5($_POST['senha'])
            ));
            $return = array('mensagem' => true);
        } catch(PDOException $e) {
            $return = array('mensagem' => getMessage());
        }
    }
}

echo json_encode($return);

?>