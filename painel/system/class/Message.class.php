<?php

    class Message extends Sql{

        private $id;
        private $date;
        private $title;
        private $text;
        private $status;
        private $type;
        private $time;
        private $user_id;

        public function setId($id)
        {
            $this->id = $id;
        }

        public function getId()
        {
            return $this->id;
        }

        public function setTime($time)
        {
            $this->time = $time;
        }

        public function getTime()
        {
            return $this->time;
        }

        public function setDate($date)
        {
            $this->date = $date;
        }

        public function getDate()
        {
            return $this->date;
        }

        public function setTitle($title)
        {
            $this->title = $title;
        }

        public function getTitle()
        {
            return $this->title;
        }

        public function setText($text)
        {
            $this->text = $text;
        }

        public function getText()
        {
            return $this->text;
        }

        public function setStatus($status)
        {
            $this->status = $status;
        }

        public function getStatus()
        {
            return $this->status;
        }

        public function setType($type)
        {
            $this->type = $type;
        }

        public function getType()
        {
            return $this->type;
        }

        public function setUserId($user_id)
        {
            $this->user_id = $user_id;
        }

        public function getUserId()
        {
            return $this->user_id;
        }

        public function insert()
        {

            $db = new Sql();

            try {
                
                $sql = "INSERT INTO `PANEL_MESSAGE` VALUES (NULL, (SELECT CURRENT_DATE()), ?, ?, ?, ?, ?, ?)";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('ssiiii', $this->title, $this->text, $this->status, $this->type, $this->time, $this->user_id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Mensagem cadastrada com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao cadastrar mensagem");
                    
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
                
                $sql = "UPDATE `PANEL_MESSAGE` SET `timeMessage` = ?, `dateMessage` = (SELECT CURRENT_DATE()), `tittleMessage` = ?, `textMessage` = ?, `statusMessage` = ?, `typeMessage` = ?, `users_idUsers` = ? WHERE `idMessage` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('issiiii', $this->title, $this->text, $this->status, $this->type, $this->user_id, $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Mensagem editada com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao editar mensagem");
                    
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
                
                $sql = "DELETE FROM `PANEL_MESSAGE` WHERE `idMessage` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('i', $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Mensagem deletada com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao deletar mensagem");
                    
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
                
                $sql = "SELECT * FROM `PANEL_MESSAGE` WHERE `idMessage` = $id";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {
                       
                        $data["idMessage"] = $resultado->idMessage;
                        $data["titleMessage"] = $resultado->titleMessage;
                        $data["textMessage"] = $resultado->textMessage;
                        $data["statusMessage"] = $resultado->statusMessage;
                        $data["typeMessage"] = $resultado->typeMessage;
                        $data["user_id"] = $resultado->users_idUsers;
                        $data["timeMessage"] = $resultado->timeMessage;
                        $data["dateMessage"] = $resultado->dateMessage;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar mensagem");
                    
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
                
                $sql = "SELECT * FROM `PANEL_MESSAGE`";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {
                       
                        $message["idMessage"] = $resultado->idMessage;
                        $message["titleMessage"] = $resultado->titleMessage;
                        $message["textMessage"] = $resultado->textMessage;
                        $message["statusMessage"] = $resultado->statusMessage;
                        $message["typeMessage"] = $resultado->typeMessage;
                        $message["user_id"] = $resultado->users_idUsers;
                        $message["timeMessage"] = $resultado->timeMessage;
                        $message["dateMessage"] = $resultado->dateMessage;
    
                        $data[] = $message;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar mensagens");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public function enableMessage()
        {

            $db = new Sql();

            try {
                
                $sql = "UPDATE `PANEL_MESSAGE` SET `statusMessage` = 1 WHERE `idMessage` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('i', $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "message"=>"Mensagem habilitada");

                } else {

                    $data = array("return"=>true, "message"=>"Erro ao habilitar mensagem");

                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }

        }

        public function desableMessage()
        {

            $db = new Sql();

            try {
                
                $sql = "UPDATE `PANEL_MESSAGE` SET `statusMessage` = 2 WHERE `idMessage` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('i', $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "message"=>"Mensagem habilitada");

                } else {

                    $data = array("return"=>true, "message"=>"Erro ao habilitar mensagem");

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