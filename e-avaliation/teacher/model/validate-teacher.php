<?php
include('../../conexao/conn.php');

$sql = $pdo->query("SELECT *, count(idTeacher) as encontrado FROM WORK_TEACHER WHERE loginTeacher = '".$_POST['loginTeacher']."' AND passwordTeacher = '".md5($_POST['passwordTeacher'])."'");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    // $return[] = array_map('utf8_encode', $resultado);
    if ($resultado['encontrado'] == 1){
        session_start();
        $_SESSION['idTeacher'] = $resultado['idTeacher'];
        $_SESSION['typeUser'] = $resultado['typeUser'];
        $_SESSION['work_school_idSchool'] = $resultado['work_school_idSchool'];

        if($resultado['typeUser'] == 1){
            $return = array('return' => 'ADM');
        }else{
            $return = array('return' => 'AVA');
        }

    }else{
        $return = array('return' => 'Login ou senha incorretos...');
    }
}

echo json_encode($return);

?>