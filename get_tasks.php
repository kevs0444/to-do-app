<?php
// Show errors for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php';

// Prepare SQL query
$sql = "SELECT * FROM tasks ORDER BY created_at DESC";

$result = $conn->query($sql);

// Return tasks as JSON
$tasks = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($tasks);
?>
