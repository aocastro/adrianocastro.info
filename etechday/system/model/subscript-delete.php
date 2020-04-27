<?php
include('../../connection/conn.php');

try {
    
    $stmt = $pdo->prepare('DELETE FROM TECHDAY_PARTICIPANT WHERE id = :id');
    $stmt->bindParam(':id', $_POST['id']); 
    $stmt->execute();

    unlink('../../participants/model/img/'.$_POST['foto']);

    $return = array('msg' => true);

} catch(PDOException $e) {
    
    $return = array('msg' => getMessage());

}

echo json_encode($return);
?>