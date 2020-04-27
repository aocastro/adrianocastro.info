<?php

if($_POST['username'] == 'e-avaliation' && $_POST['password'] == '@v@l1@t10n'){
    $data = array('return' => true);
}else{
    $data = array('return' => 'Usuário ou senha errada, tente novamente...');
}

echo json_encode($data);

?>