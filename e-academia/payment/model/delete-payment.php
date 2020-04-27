<?php
include('../../connection/conn.php');

try {
    $stmt = $pdo->prepare('DELETE FROM AGUAVIVA_PAYMENT_METHODS WHERE idPayment = :id');
    $stmt->bindParam(':id', $_POST['idPayment']); 
    $stmt->execute();
    $data = array('return' => true);
} catch(PDOException $e) {
    $data = array('return' => $e->getMessage());
}

echo json_encode($data);

?>