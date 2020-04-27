<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('UPDATE TECHDAY_PARTICIPANT SET status = :status WHERE id = :id');
    $stmt->execute(array(
        ':id'   => $_POST['id'],
        ':status' => 0
    ));
    $return = array('msg' => true);
} catch(PDOException $e) {
    $return = array('msg' => getMessage());
}

echo json_encode($return);

?>