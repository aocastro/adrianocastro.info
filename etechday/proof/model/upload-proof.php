<?php
if ( isset( $_FILES[ 'archive' ][ 'name' ] ) && $_FILES[ 'archive' ][ 'error' ] == 0 ) {
    $arquivo_tmp = $_FILES[ 'archive' ][ 'tmp_name' ];
    $nome = $_FILES[ 'archive' ][ 'name' ];
    // Pega a extensão
    $extensao = pathinfo ( $nome, PATHINFO_EXTENSION );
    // Converte a extensão para minúsculo
    $extensao = strtolower ( $extensao );
    if ( strstr ( '.jpg;.jpeg;.gif;.png;.avi;.mp4', $extensao ) ) {
        $novoNome = uniqid ( time () ) . '.' . $extensao;
        // Concatena a pasta com o nome
        $destino = 'archive/' . $novoNome;
        // tenta mover o arquivo para o destino
        if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
            // $retorno = array ('mensagem' => 'Arquivo salvo com sucesso em : ' . $destino);
            // Salvando tudo em banco de dados
            session_start();

            include('../../connection/conn.php');

            $sql = $pdo->query("SELECT * FROM TECHDAY_ELEMENTS_TEAM where TECHDAY_PARTICIPANT_id = ".$_SESSION['id']."");

            while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
                $idTeam = $resultado['TECHDAY_TEAM_id'];
            }

            date_default_timezone_set('America/Sao_Paulo');
            $date = date('Y-m-d H:i');

            try {
                $stmt = $pdo->prepare('INSERT INTO TECHDAY_FILES (date, arquivo, TECHDAY_TEAM_id, TECHDAY_PROOF_id) 
                                        VALUES (:date, :arquivo, :team, :proof)');
                $stmt->execute(array(
                ':date' => $date,
                ':arquivo' => $novoNome,
                ':team' => $idTeam,
                ':proof' => $_POST['id']
                ));
                $retorno = array('mensagem' => true);
            } catch(PDOException $e) {
                $retorno = array('mensagem' => $e->getMessage());
            }
            // $retorno = array('mensagem' => true);
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