<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['title'])) {
    $title = $_POST['title'];
    $description = $_POST['description'] ?? '';

    $stmt = $conn->prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $description);

    if ($stmt->execute()) {
        echo "Task added successfully";
    } else {
        http_response_code(500);
        echo "Error adding task: " . $stmt->error;
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo "Title is required";
}
?>

