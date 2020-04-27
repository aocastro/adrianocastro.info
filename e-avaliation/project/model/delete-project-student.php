<?php
include('../../conexao/conn.php');

try {
    $stmt = $pdo->prepare('DELETE FROM WORK_STUDENT_PROJECT WHERE work_student_idStudent = :idStudent');
    $stmt->bindParam(':idStudent' ,$_REQUEST['idStudent']); 
    $stmt->execute();
    $retorno = array('return' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('return' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>