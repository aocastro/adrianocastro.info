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
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Usuário salvo com sucesso.'
                );
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

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);