<?php

    class Sql{

        public $conn;

        public function __construct()
        {
            $host = "mysql669.umbler.com";
            $user = "adrianocastro";
            $pass = "ju15092012dri";
            $db = "adrianocastro";

            if(!$this->conn = mysqli_connect($host, $user, $pass, $db)){
                echo "Erro ao conectar banco de dados";
            }
        }

    }

?>