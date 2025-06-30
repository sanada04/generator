<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Disable error reporting (for production)
error_reporting(0);
ini_set('display_errors', 0);

// Only POST method allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid access']);
    exit;
}

try {
    // Get and validate input values
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validation
    $errors = [];

    if (empty($name)) {
        $errors[] = 'Please enter your name';
    }

    if (empty($email)) {
        $errors[] = 'Please enter your email address';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address';
    }

    if (empty($subject)) {
        $errors[] = 'Please select an inquiry type';
    }

    if (empty($message)) {
        $errors[] = 'Please enter your message';
    }

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
        exit;
    }

    // Convert subject code to text
    $subjectTexts = [
        'bug' => 'Bug Report / Error',
        'feature' => 'Feature Request / Suggestion',
        'usage' => 'Usage Questions',
        'improvement' => 'Site Improvement Suggestion',
        'collaboration' => 'Collaboration Inquiry',
        'other' => 'Other'
    ];
    $subjectText = isset($subjectTexts[$subject]) ? $subjectTexts[$subject] : 'Other';

    // File upload handling
    $attachments = [];
    $uploadDir = 'uploads/';

    // Create upload directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    if (isset($_FILES['attachments']) && !empty($_FILES['attachments']['name'][0])) {
        $fileCount = count($_FILES['attachments']['name']);
        $maxFiles = 5;
        $maxFileSize = 5 * 1024 * 1024; // 5MB

        if ($fileCount > $maxFiles) {
            echo json_encode(['success' => false, 'message' => 'Maximum 5 files can be attached']);
            exit;
        }

        $allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ];

        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['attachments']['error'][$i] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['attachments']['tmp_name'][$i];
                $originalName = $_FILES['attachments']['name'][$i];
                $fileSize = $_FILES['attachments']['size'][$i];
                $fileType = $_FILES['attachments']['type'][$i];

                // File size check
                if ($fileSize > $maxFileSize) {
                    echo json_encode(['success' => false, 'message' => $originalName . ' exceeds 5MB']);
                    exit;
                }

                // File type check
                if (!in_array($fileType, $allowedTypes)) {
                    echo json_encode(['success' => false, 'message' => $originalName . ' is not a supported file format']);
                    exit;
                }

                // Generate safe filename
                $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);
                $safeFileName = uniqid() . '_' . time() . '.' . $fileExtension;
                $destination = $uploadDir . $safeFileName;

                // Move file
                if (move_uploaded_file($tmpName, $destination)) {
                    $attachments[] = [
                        'original_name' => $originalName,
                        'file_path' => $destination,
                        'file_size' => $fileSize
                    ];
                }
            }
        }
    }

    // Email settings
    $to = 'dasana1214@gmail.com';  // Recipient email address
    $mailSubject = '【CSS Generator】' . $subjectText;

    // Create email body
    $mailBody = "A new contact form submission from CSS Generator.\n\n";
    $mailBody .= "■ Contact Details\n";
    $mailBody .= "Name: " . $name . "\n";
    $mailBody .= "Email: " . $email . "\n";
    $mailBody .= "Inquiry Type: " . $subjectText . "\n\n";
    $mailBody .= "Message:\n" . $message . "\n\n";

    if (!empty($attachments)) {
        $mailBody .= "■ Attachments\n";
        foreach ($attachments as $attachment) {
            $mailBody .= "- " . $attachment['original_name'] . " (" . formatFileSize($attachment['file_size']) . ")\n";
        }
        $mailBody .= "\n";
    }

    $mailBody .= "---\n";
    $mailBody .= "Sent: " . date('Y-m-d H:i:s') . "\n";
    $mailBody .= "Sender IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $mailBody .= "User-Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

    // Email headers
    $headers = [];
    $headers[] = 'From: ' . $email;
    $headers[] = 'Reply-To: ' . $email;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    // Send email
    $sent = mail($to, $mailSubject, $mailBody, implode("\r\n", $headers));

    if ($sent) {
        // Success response
        echo json_encode([
            'success' => true,
            'message' => 'Your inquiry has been received. Thank you for contacting us.'
        ]);

        // Delete attachment files (for security)
        foreach ($attachments as $attachment) {
            if (file_exists($attachment['file_path'])) {
                unlink($attachment['file_path']);
            }
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again later.'
        ]);
    }

} catch (Exception $e) {
    // Error response
    error_log('Contact form error: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'A system error occurred. Please contact the administrator.'
    ]);
}

// Function to format file size
function formatFileSize($bytes) {
    if ($bytes == 0) return '0 Bytes';
    $k = 1024;
    $sizes = ['Bytes', 'KB', 'MB', 'GB'];
    $i = floor(log($bytes) / log($k));
    return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
}
?>
