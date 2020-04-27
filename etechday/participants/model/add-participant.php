<?php

include('../../connection/conn.php');

$sql = $pdo->query("SELECT *, count(id) as achou FROM TECHDAY_PARTICIPANT WHERE login = '".$_POST['login']."'");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
    // $return[] = array_map('utf8_encode', $resultado);
    if($resultado['achou'] >= 1){
        $retorno = array ('mensagem' => 'Nome de usuário já em uso, tente outro!');
    }else{
        if ( isset( $_FILES[ 'foto' ][ 'name' ] ) && $_FILES[ 'foto' ][ 'error' ] == 0 ) {
            $arquivo_tmp = $_FILES[ 'foto' ][ 'tmp_name' ];
            $nome = $_FILES[ 'foto' ][ 'name' ];
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
                    include('../../connection/conn.php');
                    try {
                        $stmt = $pdo->prepare('INSERT INTO TECHDAY_PARTICIPANT (nome, email, responsavel, nascimento, modulo, perfil, login, senha, foto, status) 
                                                VALUES (:nome, :email, :responsavel, :nascimento, :modulo, :perfil, :login, :senha, :foto, :status)');
                        $stmt->execute(array(
                        ':nome' => utf8_decode($_POST['nome']),
                        ':email' => $_POST['email'],
                        ':responsavel' => utf8_decode($_POST['responsavel']),
                        ':nascimento' => $_POST['nascimento'],
                        ':modulo' => $_POST['modulo'],
                        ':perfil' => $_POST['perfil'],
                        ':login' => $_POST['login'],
                        ':senha' => md5($_POST['senha']),
                        ':foto' => $novoNome,
                        ':status' => 3
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
    }
}

echo json_encode($retorno);

?>