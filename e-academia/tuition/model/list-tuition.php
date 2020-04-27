<?php
include('../../connection/conn.php');

if(isset($_POST['idTuition'])){
    $sql = $pdo->query("SELECT *, DATE_FORMAT(T.dueDate, '%d/%m/%Y') as vencimento
                        FROM AGUAVIVA_TUITION T, AGUAVIVA_STUDENTS S
                        WHERE S.idStudents = T.AGUAVIVA_STUDENTS_idStudents AND T.statusPayment = 1 AND T.idTuition = ".$_POST['idTuition']."
                        ORDER BY T.dueDate ASC;");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }   
}else if(isset($_POST['name'])){
    $sql = $pdo->query("SELECT *, DATE_FORMAT(T.dueDate, '%d/%m/%Y') as vencimento
                        FROM AGUAVIVA_TUITION T, AGUAVIVA_STUDENTS S
                        WHERE S.idStudents = T.AGUAVIVA_STUDENTS_idStudents AND T.statusPayment = 1 AND S.nameStudents LIKE '%".utf8_decode($_POST['name'])."%'
                        ORDER BY T.dueDate ASC;");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}else{
    $sql = $pdo->query("SELECT *, DATE_FORMAT(T.dueDate, '%d/%m/%Y') as vencimento
                        FROM AGUAVIVA_TUITION T, AGUAVIVA_STUDENTS S
                        WHERE S.idStudents = T.AGUAVIVA_STUDENTS_idStudents AND T.statusPayment = 1
                        ORDER BY T.dueDate ASC");
    
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        $return[] = array_map('utf8_encode', $resultado);
    }
}

echo json_encode($return);

?>