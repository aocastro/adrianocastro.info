<?php

// echo $_POST['nome'];
// echo '<br>';
$participant = $_POST['TECHDAY_PARTICIPANT_id'];


include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('INSERT INTO TECHDAY_TEAM (nome) VALUES (:nome)');
    $stmt->execute(array(
        ':nome' => utf8_decode($_POST['nome'])
    ));
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
}

//Capturando o id do time que acabou de ser cadastrado...
$sql = $pdo->query("SELECT * FROM TECHDAY_TEAM ORDER BY id DESC LIMIT 1");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $TECHDAY_TEAM_id = $resultado['id'];
}

//Rotina para cadastar os participantes nas equipes
for($i = 0; $i < 4; $i++){
    try {
        $stmt = $pdo->prepare('INSERT INTO TECHDAY_ELEMENTS_TEAM (TECHDAY_PARTICIPANT_id, TECHDAY_TEAM_id) VALUES (:participant, :team)');
        $stmt->execute(array(
            ':participant' => $participant[$i],
            ':team' => $TECHDAY_TEAM_id
        ));
        $retorno = array('mensagem' => true);
    }catch(PDOException $e) {
        $retorno = array('mensagem' => $e->getMessage());
    }
}

echo json_encode($retorno);
?>