<?php

    class Sql{

        private $conn;

        public function __construct()
        {
            $host = "localhost";
            $user = "root";
            $pass = "";
            $db = "painel";

            if(!$this->conn = mysqli_connect($host, $user, $pass, $db)){
                echo "Erro ao conectar banco de dados";
            }
        }

        public function getConn()
        {
            return $this->conn;
        }

    }

?>