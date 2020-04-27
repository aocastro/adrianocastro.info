<?php
	include '../../config.php';
session_start();

    if(isset($_SESSION['adm'])){
        if (isset($_FILES['img']['name']) && $_FILES['img']['error'] == 0 ) {
            $arquivo_tmp = $_FILES['img']['tmp_name'];
            $nome = $_FILES['img']['name'];
            $extensao = pathinfo ( $nome, PATHINFO_EXTENSION );
                if ( strstr ( '.jpg;.jpeg;.gif;.png', $extensao ) ) {
                    $newName = uniqid ( time () ) . '.' . $extensao;
                    $destino = '../archives/' . $newName;
                    if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
                        }else{
                            $data = array ('return' => false);
                        }
                }else{
                    $data = array ('return' => false);
                }

                $archive = new Archive();

                $archive->setName(strip_tags($newname));
                $archive->setId($_REQUEST['idMessage']);

                $data = $archive->edit();

            }else{
                $data = array ('return' => false);
            }
                echo json_encode($data);
}