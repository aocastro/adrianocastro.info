<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5; URL='https://aocastro.github.io/myPWA/'"/>
    <title>Services</title>
    <link rel="stylesheet" href="../../../libs/sweetalert2/dist/sweetalert2.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    <script src="../../../libs/jquery-3.4.1.js"></script>
    <script src="../../../libs/sweetalert2/dist/sweetalert2.js"></script>
    <style>
        body{
            font-family: 'Lato', sans-serif;
        }
    </style>
</head>
<body>
    
    <?php

        //Obtém uma conexão com o banco de dados
        include('../../conexao/banco.php');

        //Obtém os dados do formulário via request
        $requestData = $_REQUEST;

        //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
        if(empty($requestData['nome'])){
            //Caso exista, definir um objeto array para retorno
            $dados = array(
                "tipo" => 'error',
                "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
            );
        } else{
            //Caso não exista(m) campo(s) vazio(s), criar variáveis para
            //manipular os dados da request
            //isset() testa se existe id dentro da request
            $id = isset($requestData['id']) ? $requestData['id'] : ''; 
            $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
            //Verifica se a operação é 'insert'
            if($operacao == 'insert'){
                //Prepara o comando sql para executar o INSERT
                try {
                    $stmt = $pdo->prepare('INSERT INTO MYPWA_USUARIO (nome, login, senha) VALUES (:nome, :login, :senha)');
                    $stmt->execute(array(
                        ':nome' => utf8_decode($requestData['nome']),
                        ':login' => $requestData['login'],
                        ':senha' => md5($requestData['senha'])
                    ));
                    $dados = $requestData['nome'].' - '.$requestData['login'].' - '.$requestData['senha'];
                    // $dados = array(
                    //     "tipo" => 'success',
                    //     "mensagem" => 'Usuário salvo com sucesso.'
                    // );
                } catch(PDOException $e) {
                    $dados = array(
                        "tipo" => 'error',
                        "mensagem" => 'Não foi possível salvar o usuário.'
                    );
                }
            } else { //Caso contrário, ou qualquer valor diferente de 'insert'
                //Prepara o comando sql para executar o UPDATE
                try {
                    $stmt = $pdo->prepare('UPDATE MYPWA_USUARIO SET nome = :nome, login = :login, senha = :senha WHERE id = :id');
                    $stmt->execute(array(
                        ':id' => $id,
                        ':nome' => utf8_decode($requestData['nome']),
                        ':login' => $requestData['login'],
                        ':senha' => md5($requestData['senha'])
                    ));
                    $dados = array(
                        "tipo" => 'success',
                        "mensagem" => 'Dados do usuário alterado com sucesso.'
                    );
                } catch(PDOException $e) {
                    $dados = array(
                        "tipo" => 'error',
                        "mensagem" => 'Não foi possível alterar os dados do usuário.'
                    );
                }
            }
        }

        echo "
            <script>
                Swal.fire({
                    title: 'e-Task',
                    text: '".$dados["mensagem"]."',
                    type: '".$dados["tipo"]."',
                    confirmButtonText: 'OK'
                })
            </script>
        ";
        
    ?>

</body>
</html>