<?php
$servername = "localhost";
$port = 4306;             // <-- add this if port is not default 3306
$username = "root";
$password = "123";
$dbname = "todo_app";

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
