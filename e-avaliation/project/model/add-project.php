<?php
include('../../conexao/conn.php');

$resumeProject = $_REQUEST['resumeProject'];
$resumeProject = preg_replace("/(\\r)?\\n/i", "<br/>", $resumeProject);
$resumeProject = utf8_decode($resumeProject);

try {
    $stmt = $pdo->prepare('INSERT INTO WORK_PROJECT (nameProject, resumeProject) VALUES (:nameProject, :resumeProject)');
    $stmt->execute(array(
        ':nameProject' => utf8_decode($_POST['nameProject']),
        ':resumeProject' => $resumeProject
    ));
    $retorno = array('mensagem' => true);
    // echo $stmt->rowCount();
} catch(PDOException $e) {
    $retorno = array('mensagem' => $e->getMessage());
    // echo 'Error: ' . $e->getMessage();
}

echo json_encode($retorno);
?>