<?php
// auth.php - Handles both dynamic user registration and credentials comparison verification
header('Content-Type: application/json');
require_once 'db.php';

// Accept JSON payload from JavaScript fetch interface
$inputData = json_decode(file_get_contents('php://input'), true);

if (!$inputData) {
    echo json_encode(["status" => "error", "message" => "Invalid incoming payload format"]);
    exit;
}

$action = $inputData['action'] ?? '';
$email = trim($inputData['email'] ?? '');
$password = $inputData['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Required input data credentials fields are empty."]);
    exit;
}

// Route active processing states securely
if ($action === 'signup') {
    $name = trim($inputData['name'] ?? '');
    
    // Check if user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "This email address is already registered."]);
        exit;
    }

    // Securely hash user password before storage execution
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    if ($stmt->execute([$name, $email, $hashedPassword])) {
        echo json_encode(["status" => "success", "message" => "Registration successful! You can log in now."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to write user profile entry to file records database."]);
    }

} elseif ($action === 'login') {
    // Look up the user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Verify profile structure existence and match cryptographically encrypted hashes
    if ($user && password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success", 
            "message" => "Authentication clear. Welcome back!",
            "user" => [
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email matching profile signature or wrong entry password string."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Specified action route handling target is unsupported."]);
}
?>