<?php
header('Content-Type: application/json');

// Simple Newsletter Handler for Shared Hosting
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }

    // 1. Sample: Save to a CSV file (Simple data storage)
    $file = 'subscribers.csv';
    $date = date('Y-m-d H:i:s');
    $data = [$date, $email];
    
    $file_handle = fopen($file, 'a');
    if ($file_handle) {
        fputcsv($file_handle, $data);
        fclose($file_handle);
        
        // 2. Sample: You could also send a notification email to yourself
        // $to = "your-email@example.com";
        // $subject = "New Newsletter Subscriber";
        // mail($to, $subject, "New subscriber: $email");

        echo json_encode(['success' => true, 'message' => 'Successfully subscribed!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Could not save data. Check folder permissions.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
}
?>
