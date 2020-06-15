<?php

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['AGUAVIVA_PROVIDER_idProvider'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idPay = isset($requestData['idPay']) ? $requestData['idPay'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            // Gera o status para o cadastro da conta
            $status = 1;
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_PAY (valuePay, datePay, status, AGUAVIVA_PROVIDER_idProvider) VALUES (:valuePay, :datePay, :status, :AGUAVIVA_PROVIDER_idProvider)');
                $stmt->execute(array(
                    ':valuePay' => $requestData['valuePay'],
                    ':datePay' => $requestData['datePay'],
                    ':status' => $status,
                    ':AGUAVIVA_PROVIDER_idProvider' => $requestData['AGUAVIVA_PROVIDER_idProvider'],
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Conta a pagar salva com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar a conta a pagar.'
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            //Muda o status da conta para pago
            $status = 2;
            try {
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_PAY SET discountPay = :discountPay, additionPay = :additionPay, amountPaid = :amountPaid, status = :status, dateRegister = :dateRegister WHERE idPay = :idPay');
                $stmt->execute(array(
                    ':idPay' => $idPay,
                    ':discountPay' => $requestData['discountPay'],
                    ':additionPay' => $requestData['additionPay'],
                    ':amountPaid' => $requestData['amountPaid'],
                    ':status' => $status,
                    ':dateRegister' => $requestData['dateRegister']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Contas a pagar baixado com sucesso.'
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