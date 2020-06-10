<?php

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['nameServices'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idServices = isset($requestData['idServices']) ? $requestData['idServices'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_SERVICES (nameServices, valueServices) VALUES (:nameServices, :valueServices)');
                $stmt->execute(array(
                    ':nameServices' => utf8_decode($requestData['nameServices']),
                    ':valueServices' => $requestData['valueServices'])
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Serviço salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o serviço.'
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            try {
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_SERVICES SET nameServices = :nameServices, valueServices = :valueServices WHERE idServices = :idServices');
                $stmt->execute(array(
                    ':idServices' => $idServices,
                    ':nameServices' => utf8_decode($requestData['nameServices']),
                    ':valueServices' => $requestData['valueServices'])
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Dados do serviço alterado com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar os dados do serviço.'
                );
            }
        }
    }

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);