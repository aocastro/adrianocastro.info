<?php
include('../../connection/conn.php');

session_start();

try {
    $stmt = $pdo->prepare('UPDATE AGUAVIVA_STUDENTS 
                            SET nameStudents = :a,
                                addressStudents = :b,
                                cityStudents = :c,
                                phoneStudents = :d,
                                celularStudents = :e,
                                birthStudents = :f,
                                sexStudents = :g,
                                emailStudents = :h,
                                paydayStudents = :i,
                                AGUAVIVA_USERS_idUsers = :j,
                                AGUAVIVA_SERVICES_idServices = :l,
                                observationStudents = :m
                            WHERE idStudents = :idStudents');
    $stmt->execute(array(
    ':idStudents' => $_POST['idStudents'],
    ':a' => utf8_decode($_POST['nameStudents']),
    ':b' => utf8_decode($_POST['addressStudents']),
    ':c' => utf8_decode($_POST['cityStudents']),
    ':d' => $_POST['phoneStudents'],
    ':e' => $_POST['celularStudents'],
    ':f' => $_POST['birthStudents'],
    ':g' => $_POST['sexStudents'],
    ':h' => $_POST['emailStudents'],
    ':i' => $_POST['paydayStudents'],
    ':j' => $_SESSION['idUsers'],
    ':l' => $_POST['AGUAVIVA_SERVICES_idServices'],
    ':m' => $_POST['observationStudents']
    ));

    $data = array('mensagem' => true);
} catch(PDOException $e) {
    $data = array('mensagem' => $e->getMessage());
}

echo json_encode($data);
?>