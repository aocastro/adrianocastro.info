<?php

    class Archive extends Sql{

        private $id;
        private $name;
        private $message_id;

        public function setId($id)
        {
            $this->id = $id;
        }

        public function getId()
        {
            return $this->id;
        }

        public function setName($name)
        {
            $this->name = $name;
        }

        public function getName()
        {
            return $this->name;
        }

        public function setMessageId($message_id)
        {
            $this->message_id = $message_id;
        }

        public function getMessageId()
        {
            return $this->message_id;
        }

        public function insert()
        {

            $db = new Sql();

            try {
                
                $sql = "INSERT INTO `PANEL_ARCHIVE` VALUES (NULL, ?, ?)";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('si', $this->name, $this->message_id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Arquivo cadastrado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao cadastrar arquivo");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public function edit()
        {

            $db = new Sql();

            try {
                
                $sql = "UPDATE `PANEL_ARCHIVE` SET `nameArchive` = ?, `message_idMessage` = ? WHERE `idArchive` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('sii', $this->name, $this->message_id, $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Arquivo editado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao editar arquivo");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public function del()
        {

            $db = new Sql();

            try {
                
                $sql = "DELETE FROM `PANEL_ARCHIVE` WHERE `idArchive` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('i', $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Arquivo deletado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao deletar arquivo");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public static function view($id)
        {

            $db = new Sql();

            try {
                
                $sql = "SELECT * FROM `PANEL_ARCHIVE` WHERE `idArchive` = $id";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {
                       
                        $data["idArchive"] = $resultado->idArchive;
                        $data["nameArchive"] = $resultado->nameArchive;
                        $data["message_id"] = $resultado->message_idMessage;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar arquivo");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public static function list()
        {

            $db = new Sql();

            try {
                
                $sql = "SELECT * FROM `PANEL_ARCHIVE`";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {

                        $archive["idArchive"] = $resultado->idArchive;
                        $archive["nameArchive"] = $resultado->nameArchive;
                        $archive["message_id"] = $resultado->message_idMessage;

                        $data[] = $archive;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar arquivos");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

    }

?>