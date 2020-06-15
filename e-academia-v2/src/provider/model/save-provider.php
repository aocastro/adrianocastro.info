<?php

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['nameProvider'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idProvider = isset($requestData['idProvider']) ? $requestData['idProvider'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_PROVIDER (nameProvider, addressProvider, phoneProvider, celularProvider) VALUES (:nameProvider, :addressProvider, :phoneProvider, :celularProvider)');
                $stmt->execute(array(
                    ':nameProvider' => utf8_decode($requestData['nameProvider']),
                    ':addressProvider' => utf8_decode($requestData['addressProvider']),
                    ':phoneProvider' => $requestData['phoneProvider'],
                    ':celularProvider' => $requestData['celularProvider'])
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Fornecedor salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o fornecedor.'
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            try {
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_PROVIDER SET nameProvider = :nameProvider, addressProvider = :addressProvider, phoneProvider = :phoneProvider, celularProvider = :celularProvider WHERE idProvider = :idProvider');
                $stmt->execute(array(
                    ':idProvider' => $idProvider,
                    ':nameProvider' => utf8_decode($requestData['nameProvider']),
                    ':addressProvider' => utf8_decode($requestData['addressProvider']),
                    ':phoneProvider' => $requestData['phoneProvider'],
                    ':celularProvider' => $requestData['celularProvider'])
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Dados do forncedor alterado com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar os dados do fornecedor.'
                );
            }
        }
    }

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);