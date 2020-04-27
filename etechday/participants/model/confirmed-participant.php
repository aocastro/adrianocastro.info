<?php
include('../../connection/conn.php');

$sql = $pdo->query("SELECT * FROM TECHDAY_PARTICIPANT WHERE id = ".$_POST['id']."");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    try {
        $stmt = $pdo->prepare('UPDATE TECHDAY_PARTICIPANT SET status = :status WHERE id = :id');
        $stmt->execute(array(
            ':id'   => $_POST['id'],
            ':status' => 2
        ));
        $return = array('msg' => true);
    } catch(PDOException $e) {
        $return = array('msg' => getMessage());
    }
}

echo json_encode($return);

?>