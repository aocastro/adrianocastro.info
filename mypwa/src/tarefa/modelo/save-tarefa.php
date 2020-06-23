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
                $stmt = $pdo->prepare('INSERT INTO MYPWA_TAREFA (nome, data, local, status, usuario_id) VALUES (:nome, :data, :local, :status, :usuario_id)');
                $stmt->execute(array(
                    ':nome' => utf8_decode($requestData['nome']),
                    ':data' => $requestData['data'],
                    ':local' => utf8_decode($requestData['local']),
                    ':status' => $requestData['status'],
                    ':usuario_id' => $requestData['usuario_id']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Tarefa salva com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar a tarefa.'
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            try {
                $stmt = $pdo->prepare('UPDATE MYPWA_TAREFA SET nome = :nome, data = :data, local = :local, status = :status, usuario_id = :usuario_id WHERE id = :id');
                $stmt->execute(array(
                    ':id' => $id,
                    ':nome' => utf8_decode($requestData['nome']),
                    ':data' => $requestData['data'],
                    ':local' => utf8_decode($requestData['local']),
                    ':status' => $requestData['status'],
                    ':usuario_id' => $requestData['usuario_id']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Tarefa alterada com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar a tarefa.'
                );
            }
        }
    }

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);