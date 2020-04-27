<?php

    class User extends Sql{

        private $id;
        private $name;
        private $login;
        private $passwd;

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

        public function setLogin($login)
        {
            $this->login = $login;
        }

        public function getLogin()
        {
            return $this->login;
        }

        public function setPasswd($passwd)
        {
            $this->passwd = $passwd;
        }

        public function getPasswd()
        {
            return $this->passwd;
        }

        public function insert()
        {

            $db = new Sql();

            try {
                
                $sql = "INSERT INTO `PANEL_USERS` VALUES (NULL, ?, ?, md5(?))";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('sss', $this->name, $this->login, $this->passwd);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Usuário cadastrado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao cadastrar usuário");
                    
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
                
                $sql = "UPDATE `PANEL_USERS` SET `nameUsers` = ?, `loginUsers` = ?, `passwordUsers` = md5(?) WHERE `idUsers` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('sssi', $this->name, $this->login, $this->passwd, $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Usuário editado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao editar usuário");
                    
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
                
                $sql = "DELETE FROM `PANEL_USERS` WHERE `idUsers` = ?";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('i', $this->id);

                if ($stm->execute()) {

                    $data = array("return"=>true, "msg"=>"Usuário deletado com sucesso");

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao deletar usuário");
                    
                }

            } catch (Exception $e) {
                
                $data = array("return"=>false, "msg"=>"Erro: ".$e->getMessage());

            } finally {

                $db->getConn()->close();
                
                return $data;

            }
        }

        public function login()
        {

            $db = new Sql();

            try {
                
                $sql = "SELECT * FROM `PANEL_USERS` WHERE `loginUsers` = ? AND `passwordUsers` = md5(?)";

                $stm = $db->getConn()->prepare($sql);

                $stm->bind_param('ss', $this->login, $this->passwd);

                if ($rs = $stm->execute()) {

                    if (mysqli_num_rows($rs) > 0) {

                        $data = array("return"=>true, "msg"=>"Login realizado com sucesso");

                    } else {

                        $data = array("return"=>false, "msg"=>"Login e/ou Senha inválidos");

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar usuário");
                    
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
                
                $sql = "SELECT * FROM `PANEL_USERS` WHERE `idUsers` = $id";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {

                        $data["idUsers"] = $resultado->idUsers;
                        $data["nameUsers"] = $resultado->nameUsers;
                        $data["loginUsers"] = $resultado->loginUsers;
                        $data["passwordUsers"] = $resultado->passwordUsers;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar usuário");
                    
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
                
                $sql = "SELECT * FROM `PANEL_USERS`";

                if ($rs = $db->getConn()->query($sql)) {

                    while ($resultado = mysqli_fetch_object($rs)) {

                        $user["idUsers"] = $resultado->idUsers;
                        $user["nameUsers"] = $resultado->nameUsers;
                        $user["loginUsers"] = $resultado->loginUsers;
                        $user["passwordUsers"] = $resultado->passwordUsers;

                    }

                } else {

                    $data = array("return"=>false, "msg"=>"Erro ao buscar usuários");
                    
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