<?php
    include('../../connection/conn.php');

    try {
        $stmt = $pdo->prepare('DELETE FROM AGUAVIVA_TUITION WHERE idTuition = :id');
        $stmt->execute(array(
        ':id' => $_REQUEST['idTuition']
        ));
        
        $dados = array(
            "tipo" => 'success',
            "mensagem" => 'Mensalidade excluída com sucesso.'
        );

        } catch(PDOException $e) {
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Não foi possível excluir a mensalidade. ==>'.$e
        );
    }

    echo json_encode($dados);
