<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT P.foto, P.nome, T.nome as equipe, E.TECHDAY_TEAM_id
FROM TECHDAY_PARTICIPANT P, TECHDAY_TEAM T, TECHDAY_ELEMENTS_TEAM E
WHERE P.id = E.TECHDAY_PARTICIPANT_id AND T.id = E.TECHDAY_TEAM_id
ORDER BY T.id");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>