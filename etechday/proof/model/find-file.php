<?php
include('../../connection/conn.php');

session_start();

$sql = $pdo->query("SELECT count(f.id) as resultado
FROM TECHDAY_ELEMENTS_TEAM e, TECHDAY_FILES f
WHERE e.TECHDAY_TEAM_id = f.TECHDAY_TEAM_id AND e.TECHDAY_PARTICIPANT_id = ".$_SESSION['id']."");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>