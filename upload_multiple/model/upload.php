<?php

    $imagens = $_FILES['arquivo'];

    $local = "img/";

    $indice = count(array_filter($imagens['name']));

    if($indice <= 0){
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi selecionado nenhum arquivo.'
        );
    }else{
        
        for($i = 0; $i < $indice; $i++){
            // Pega a extensão do arquivo foi enviado....
            $extensao = pathinfo($imagens['name'][$i], PATHINFO_EXTENSION);
            // Converte a extensão em letra minúscula para facilitar na comparação
            $extensao = strtolower ( $extensao );
            // Cria um novo nome para o arquivo único
            $novoNome = uniqid ( time () ) . '.' . $extensao;

            $enviar = move_uploaded_file($imagens['tmp_name'][$i], $local.$novoNome);
        }

        if($enviar == true){
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'As imagens foram carregadas corretamente.'
            );
        }else{
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Houve erro ao enviar as imagens.'
            );
        }
    }

    echo json_encode($dados);