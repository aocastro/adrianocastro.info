<?php

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['namePayment'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idPayment = isset($requestData['idPayment']) ? $requestData['idPayment'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_PAYMENT_METHODS (namePayment) VALUES (:namePayment)');
                $stmt->execute(array(
                    ':namePayment' => utf8_decode($requestData['namePayment']))
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Forma de pagamento salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar a formar de pagamento.'
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            try {
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_PAYMENT_METHODS SET namePayment = :namePaymentWHERE idPayment = :idPayment');
                $stmt->execute(array(
                    ':idPayment' => $idPayment,
                    ':namePayment' => utf8_decode($requestData['namePayment'])
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Dados da forma de pagamento alterado com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar os dados da forma de pagamento.'
                );
            }
        }
    }

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);