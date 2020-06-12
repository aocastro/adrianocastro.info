<?php

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['nameUsers'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idUsers = isset($requestData['idUsers']) ? $requestData['idUsers'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_USERS (nameUsers, loginUsers, passwordUsers) VALUES (:nameUsers, :loginUsers, :passwordUsers)');
                $stmt->execute(array(
                    ':nameUsers' => utf8_decode($requestData['nameUsers']),
                    ':loginUsers' => $requestData['loginUsers'],
                    ':passwordUsers' => md5($requestData['passwordUsers']))
                );
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
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_USERS SET nameUsers = :nameUsers, loginUsers = :loginUsers, passwordUsers = :passwordUsers WHERE idUsers = :idUsers');
                $stmt->execute(array(
                    ':idUsers' => $idUsers,
                    ':nameUsers' => utf8_decode($requestData['nameUsers']),
                    ':loginUsers' => $requestData['loginUsers'],
                    ':passwordUsers' => md5($requestData['passwordUsers']))
                );
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