<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT P.FOTO as icon, P.login, T.foto, T.descricao 
                    FROM TECHDAY_TIMELINE T, TECHDAY_PARTICIPANT P
                    WHERE T.TECHDAY_PARTICIPANT_id = P.id
                    ORDER BY T.id DESC");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    $return[] = array_map('utf8_encode', $resultado);
}

echo json_encode($return);

?>