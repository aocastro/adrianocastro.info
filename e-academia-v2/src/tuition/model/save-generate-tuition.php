<?php
    include('../../connection/conn.php');

    try {
        $stmt = $pdo->prepare('INSERT INTO AGUAVIVA_TUITION (dueDate, grossValue, statusPayment, AGUAVIVA_STUDENTS_idStudents) 
                                                        VALUES (:a, :b, :c, :d)');
        $stmt->execute(array(
            ':a' => $_REQUEST['dueDate'],
            ':b' => $_REQUEST['grossValue'],
            ':c' => 1,
            ':d' => $_REQUEST['idStudents']
            ));


            $dados = array(
                "tipo" => 'success',
                "mensagem" => 'Mensalidade gerada com sucesso.'
            );
    } catch(PDOException $e) {
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Não foi possível gerar a mensalidade. ==>'.$e
        );
    }

    echo json_encode($dados);
