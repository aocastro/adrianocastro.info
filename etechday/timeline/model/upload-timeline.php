<?php

session_start();

$idParticipant = $_SESSION['id'];

if ( isset( $_FILES[ 'archive' ][ 'name' ] ) && $_FILES[ 'archive' ][ 'error' ] == 0 ) {

    $arquivo_tmp = $_FILES[ 'archive' ][ 'tmp_name' ];
    $nome = $_FILES[ 'archive' ][ 'name' ];

    $extensao = pathinfo ( $nome, PATHINFO_EXTENSION );

    $extensao = strtolower ( $extensao );

    if ( strstr ( '.doc;.docx;.xls;.xlsx;.pdf;.jpg;.jpeg;.gif;.png', $extensao ) ) {
        $novoNome = uniqid ( time () ) . '.' . $extensao;
        $destino = 'img/' . $novoNome;

        if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
            include('../../connection/conn.php');
            try {
                $stmt = $pdo->prepare('INSERT INTO TECHDAY_TIMELINE (foto, descricao, TECHDAY_PARTICIPANT_id) VALUES 
                                    (:foto, :descricao, :id)');
                $stmt->execute(array(
                    ':foto' => $novoNome,
                    ':descricao' => utf8_decode($_POST['coment']),
                    ':id' => $idParticipant
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