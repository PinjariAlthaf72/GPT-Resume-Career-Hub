<?php
// Step 1: Connect to MySQL
$conn = new mysqli("localhost", "root", "");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Create Database & Table setup
$conn->query("CREATE DATABASE IF NOT EXISTS student_db");
$conn->select_db("student_db");
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
)");

// Insert a mock user if table is fresh so you can test login
$conn->query("INSERT IGNORE INTO users (email, password) VALUES ('test@gmail.com', '123456')");

session_start();
$message = "";

// Handle Login Process
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login_action'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password']; // Note: Real apps should use password_hash

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['user_logged_in'] = true;
        $_SESSION['user_email'] = $email;
        $message = "✅ Login Successful!";
    } else {
        $message = "❌ Invalid Email or Password!";
    }
}

// Handle Sign Out
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Check auth status for JavaScript controller injection
$isLoggedInStatus = isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true ? 'true' : 'false';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPT Resume & Career Hub</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
</head>
<body>

    <div class="background-slider">
        <div class="slide active" style="background-image: url('HTML/image1.jpg');"></div>
        <div class="slide" style="background-image: url('HTML/image2.jpg');"></div>
        <div class="slide" style="background-image: url('HTML/image3.jpg');"></div>
        <div class="overlay-scrim"></div>
    </div>

    <header class="navbar">
        <div class="logo"><span class="logo-dot"></span>GPT HUB</div>
        <nav class="nav-links">
            <a href="#" class="active">Home</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
        </nav>
        <div class="nav-actions">
            <?php if(isset($_SESSION['user_logged_in'])): ?>
                <span class="user-badge">👤 <?php echo $_SESSION['user_email']; ?></span>
                <a href="?logout=1" class="btn-login" style="background:#ef4444; text-decoration:none;">Sign Out</a>
            <?php else: ?>
                <button class="btn-login" id="loginHeaderBtn">Sign In</button>
            <?php endif; ?>
        </div>
    </header>

    <main class="main-wrapper">
        <?php if(!empty($message)): ?>
            <div class="status-notification-alert"><?php echo $message; ?></div>
        <?php endif; ?>

        <section class="hero-intro">
            <div class="badge">✨ Next-Generation AI Engine</div>
            <h1 class="hero-title">Welcome to <br><span class="gradient-box">GPT RESUME BUILDER</span></h1>
            <p class="hero-subtitle">Create your winning resume and navigate your professional trajectory with custom AI models.</p>
        </section>

        <section class="options-container">
            <div class="cards-grid">
                <div class="feature-card" id="goToBuilder">
                    <div class="icon-wrapper bg-blue">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
                    </div>
                    <h3>AI Resume Builder</h3>
                    <p>Craft tailored, ATS-optimized resumes designed to catch the eyes of top recruiters automatically.</p>
                    <span class="action-link">Launch Builder &rarr;</span>
                </div>

                <div class="feature-card" id="goToGuidance">
                    <div class="icon-wrapper bg-purple">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <h3>Career Guidance</h3>
                    <p>Map your skills against current market frameworks and track growth trajectories with precision.</p>
                    <span class="action-link">Explore Pathing &rarr;</span>
                </div>
            </div>
        </section>
    </main>

    <div id="authModal" class="custom-modal <?php echo (!empty($message) && !isset($_SESSION['user_logged_in'])) ? 'show-modal' : 'hidden'; ?>">
        <div class="modal-card auth-form-card">
            <div class="close-modal-x" id="closeModalBtn">&times;</div>
            <div class="modal-icon">🔒</div>
            <h2 id="modalTitle">Account Access</h2>
            <p id="modalMessage">Ee service ni active cheyyalante primary ga dynamic verify portal login system finish avvali.</p>
            
            <form method="POST" action="index.php" class="embedded-login-form">
                <input type="hidden" name="login_action" value="1">
                <input type="email" name="email" placeholder="Enter Email Address" required><br>
                <input type="password" name="password" placeholder="Enter Password" required><br>
                <button type="submit" class="btn-modal-action">Secure Login Gateway</button>
            </form>
        </div>
    </div>

    <script>
        const USER_AUTH_STATE = <?php echo $isLoggedInStatus; ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>