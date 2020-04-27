<?php

if ( isset( $_FILES[ 'imageSchool' ][ 'name' ] ) && $_FILES[ 'imageSchool' ][ 'error' ] == 0 ) {
    $arquivo_tmp = $_FILES[ 'imageSchool' ][ 'tmp_name' ];
    $nome = $_FILES[ 'imageSchool' ][ 'name' ];
    // Pega a extensão
    $extensao = pathinfo ( $nome, PATHINFO_EXTENSION );
    // Converte a extensão para minúsculo
    $extensao = strtolower ( $extensao );
    if ( strstr ( '.jpg;.jpeg;.gif;.png', $extensao ) ) {
        $novoNome = uniqid ( time () ) . '.' . $extensao;
        // Concatena a pasta com o nome
        $destino = 'img/' . $novoNome;
        // tenta mover o arquivo para o destino
        if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
            // $retorno = array ('mensagem' => 'Arquivo salvo com sucesso em : ' . $destino);
            // Salvando tudo em banco de dados
            include('../../conexao/conn.php');
            try {
                $stmt = $pdo->prepare('INSERT INTO WORK_SCHOOL (nameSchool, imageSchool) 
                                        VALUES (:nameSchool, :imageSchool)');
                $stmt->execute(array(
                ':nameSchool' => utf8_decode($_POST['nameSchool']),
                ':imageSchool' => $novoNome
            ));
                $retorno = array('mensagem' => true);
                // echo $stmt->rowCount();
            } catch(PDOException $e) {
                $retorno = array('mensagem' => $e->getMessage());
                // echo 'Error: ' . $e->getMessage();
            }
        }
        else
            $retorno = array ('mensagem' => 'Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita.');
    }
    else
        $retorno = array ('mensagem' => 'Você poderá enviar apenas arquivos "*.jpg;*.jpeg;*.gif;*.png"');
}
else
    $retorno = array ('mensagem' => 'Você não enviou nenhum arquivo!');


echo json_encode($retorno);

?>