<?php

    session_start();

    //Obtém uma conexão com o banco de dados
    include('../../connection/conn.php');

    //Obtém os dados do formulário via request
    $requestData = $_REQUEST;

    //Verifica se existe(m) campo(s) obrigatório(s) vazio(s)
    if(empty($requestData['nameStudents'])){
        //Caso exista, definir um objeto array para retorno
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else{
        //Caso não exista(m) campo(s) vazio(s), criar variáveis para
        //manipular os dados da request
        //isset() testa se existe id dentro da request
        $idStudents = isset($requestData['idStudents']) ? $requestData['idStudents'] : ''; 
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
        //Verifica se a operação é 'insert'
        if($operacao == 'insert'){
            //Prepara o comando sql para executar o INSERT
            try {
                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_STUDENTS (nameStudents, addressStudents, cityStudents, phoneStudents, celularStudents, birthStudents, sexStudents, emailStudents, paydayStudents, observationStudents, AGUAVIVA_USERS_idUsers, AGUAVIVA_SERVICES_idServices) VALUES (:nameStudents, :addressStudents, :cityStudents, :phoneStudents, :celularStudents, :birthStudents, :sexStudents, :emailStudents, :paydayStudents, :observationStudents, :idUsers, :idServices)');
                $stmt->execute(array(
                    ':nameStudents' => utf8_decode($requestData['nameStudents']),
                    ':addressStudents' => utf8_decode($requestData['addressStudents']),
                    ':cityStudents' => utf8_decode($requestData['cityStudents']),
                    ':phoneStudents' => $requestData['phoneStudents'],
                    ':celularStudents' => $requestData['celularStudents'],
                    ':birthStudents' => $requestData['birthStudents'],
                    ':sexStudents' => $requestData['sexStudents'],
                    ':emailStudents' => $requestData['emailStudents'],
                    ':paydayStudents' => $requestData['paydayStudents'],
                    ':observationStudents' => utf8_decode($requestData['observationStudents']),
                    ':idUsers' => $_SESSION['idUsers'],
                    ':idServices' => $requestData['AGUAVIVA_SERVICES_idServices'])
                );

                // Início da busca do id cadastrado
                $sql = $pdo->query("SELECT * FROM AGUAVIVA_STUDENTS ORDER BY idStudents DESC LIMIT 1");

                while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
                    $idStudents = $resultado['idStudents'];
                }
                // Fim da busca do id do cadastro

                // Início da busca do valor da mensalidade
                $sql = $pdo->query("SELECT * FROM AGUAVIVA_SERVICES WHERE idServices = ".$_REQUEST['AGUAVIVA_SERVICES_idServices']."");

                while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
                    $valueServices = $resultado['valueServices'];
                }
                // Fim da busca do valor da mensalidade

                // Procedimento para gerar a primeira mensalidade
                $dia = $requestData['paydayStudents'];
                $mes = date('m');
                $ano = date('Y');

                $dueDate = $ano."-".$mes."-".$dia;

                $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_TUITION (dueDate, grossValue, statusPayment, AGUAVIVA_STUDENTS_idStudents) VALUES (:a, :b, :c, :d)');
                $stmt->execute(array(
                    ':a' => $dueDate,
                    ':b' => $valueServices,
                    ':c' => 1,
                    ':d' => $idStudents
                    ));

                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Aluno salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o cadastro do aluno.'.$e
                );
            }
        } else { //Caso contrário, ou qualquer valor diferente de 'insert'
            //Prepara o comando sql para executar o UPDATE
            try {
                $stmt = $pdo->prepare('UPDATE AGUAVIVA_STUDENTS SET nameStudents = :nameStudents, addressStudents = :addressStudents, cityStudents = :cityStudents, phoneStudents = :phoneStudents, celularStudents = :celularStudents, birthStudents = :birthStudents, sexStudents = :sexStudents, emailStudents = :emailStudents, paydayStudents = :paydayStudents, observationStudents = :observationStudents, AGUAVIVA_USERS_idUsers = :AGUAVIVA_USERS_idUsers, AGUAVIVA_SERVICES_idServices = :AGUAVIVA_SERVICES_idServices WHERE idStudents = :idStudents');
                $stmt->execute(array(
                    ':idStudents' => $idStudents,
                    ':nameStudents' => utf8_decode($requestData['nameStudents']),
                    ':addressStudents' => utf8_decode($requestData['addressStudents']),
                    ':cityStudents' => utf8_decode($requestData['cityStudents']),
                    ':phoneStudents' => $requestData['phoneStudents'],
                    ':celularStudents' => $requestData['celularStudents'],
                    ':birthStudents' => $requestData['birthStudents'],
                    ':sexStudents' => $requestData['sexStudents'],
                    ':emailStudents' => $requestData['emailStudents'],
                    ':paydayStudents' => $requestData['paydayStudents'],
                    ':observationStudents' => utf8_decode($requestData['observationStudents']),
                    ':AGUAVIVA_USERS_idUsers' => $_SESSION['idUsers'],
                    ':AGUAVIVA_SERVICES_idServices' => $requestData['AGUAVIVA_SERVICES_idServices'])
                );
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Dados do aluno alterado com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível alterar os dados do aluno.'
                );
            }
        }
    }

    //Converte um array de dados para a represetação JSON
    echo json_encode($dados);