<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('DELETE FROM AGUAVIVA_SERVICES WHERE idServices = :id');
    $stmt->bindParam(':id', $_POST['idServices']); 
    $stmt->execute();
    $data = array('return' => true);
} catch(PDOException $e) {
    echo 'Error: ' . $e->getMessage();
    $data = array('return' => $e->getMessage());
}

echo json_encode($data);

?>