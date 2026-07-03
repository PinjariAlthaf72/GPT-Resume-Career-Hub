<?php
// db.php - Database connection configuration
$host = "localhost";
$db_user = "root"; // Replace with your MySQL username
$db_pass = "";     // Replace with your MySQL password
$db_name = "gpt_hub";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
       
    ]);
} catch (PDOException $e) {
    // Return structured failure response to application engine request
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}
?>