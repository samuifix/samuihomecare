<?php
header('Content-Type: application/json');

// Simple Contact Form Handler for Shared Hosting
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }

    // 1. Send Email Notification
    $to = "info@samuihomecare.com"; // Change this to your actual business email
    $subject = "New Contact from Samui Home Care Website";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    $mail_sent = mail($to, $subject, $body, $headers);

    // 2. Log to a file (optional - for backup)
    $log_file = 'contact_submissions.log';
    $log_entry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);

    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you for your message! We will get back to you soon.']);
    } else {
        // If mail() fails, we still return success if logged, but mention it to user if you want
        echo json_encode(['success' => true, 'message' => 'Message received (Logged).']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
}
?>
