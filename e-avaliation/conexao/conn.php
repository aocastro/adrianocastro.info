<?php
// Conexão off-line
// $hostname = 'localhost';
// $dbname = 'adrianocastro';
// $username = 'root';
// $password = '';

// Conexão on-line
$hostname = 'mysql669.umbler.com';
$dbname = 'adrianocastro';
$username = 'adrianocastro';
$password = 'ju15092012dri';

try {
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname.'', $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>