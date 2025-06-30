<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// エラーレポートを無効化（本番環境用）
error_reporting(0);
ini_set('display_errors', 0);

// POST以外はエラー
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '不正なアクセスです']);
    exit;
}

try {
    // 入力値の取得と検証
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // バリデーション
    $errors = [];

    if (empty($name)) {
        $errors[] = 'お名前を入力してください';
    }

    if (empty($email)) {
        $errors[] = 'メールアドレスを入力してください';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = '正しいメールアドレスを入力してください';
    }

    if (empty($subject)) {
        $errors[] = 'お問い合わせ種別を選択してください';
    }

    if (empty($message)) {
        $errors[] = 'お問い合わせ内容を入力してください';
    }

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode('、', $errors)]);
        exit;
    }

    // お問い合わせ種別のテキスト変換
    $subjectTexts = [
        'bug' => '不具合・エラー報告',
        'feature' => '新機能のご要望・ご提案',
        'usage' => '操作方法に関するご質問',
        'improvement' => 'サイトの改善提案',
        'collaboration' => 'コラボレーションのご相談',
        'other' => 'その他'
    ];
    $subjectText = isset($subjectTexts[$subject]) ? $subjectTexts[$subject] : 'その他';

    // ファイルアップロード処理
    $attachments = [];
    $uploadDir = 'uploads/';

    // アップロードディレクトリが存在しない場合は作成
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    if (isset($_FILES['attachments']) && !empty($_FILES['attachments']['name'][0])) {
        $fileCount = count($_FILES['attachments']['name']);
        $maxFiles = 5;
        $maxFileSize = 5 * 1024 * 1024; // 5MB

        if ($fileCount > $maxFiles) {
            echo json_encode(['success' => false, 'message' => 'ファイルは最大5個まで添付できます']);
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

                // ファイルサイズチェック
                if ($fileSize > $maxFileSize) {
                    echo json_encode(['success' => false, 'message' => $originalName . ' は5MBを超えています']);
                    exit;
                }

                // ファイルタイプチェック
                if (!in_array($fileType, $allowedTypes)) {
                    echo json_encode(['success' => false, 'message' => $originalName . ' は対応していないファイル形式です']);
                    exit;
                }

                // 安全なファイル名の生成
                $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);
                $safeFileName = uniqid() . '_' . time() . '.' . $fileExtension;
                $destination = $uploadDir . $safeFileName;

                // ファイル移動
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

    // メール送信設定
    $to = 'dasana1214@gmail.com';  // 送信先メールアドレス
    $mailSubject = '【CSSジェネレーター】' . $subjectText;

    // メール本文の作成
    $mailBody = "CSSジェネレーターからお問い合わせがありました。\n\n";
    $mailBody .= "■ お問い合わせ内容\n";
    $mailBody .= "お名前: " . $name . "\n";
    $mailBody .= "メールアドレス: " . $email . "\n";
    $mailBody .= "お問い合わせ種別: " . $subjectText . "\n\n";
    $mailBody .= "お問い合わせ内容:\n" . $message . "\n\n";

    if (!empty($attachments)) {
        $mailBody .= "■ 添付ファイル\n";
        foreach ($attachments as $attachment) {
            $mailBody .= "- " . $attachment['original_name'] . " (" . formatFileSize($attachment['file_size']) . ")\n";
        }
        $mailBody .= "\n";
    }

    $mailBody .= "---\n";
    $mailBody .= "送信日時: " . date('Y-m-d H:i:s') . "\n";
    $mailBody .= "送信者IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $mailBody .= "User-Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

    // メールヘッダー
    $headers = [];
    $headers[] = 'From: ' . $email;
    $headers[] = 'Reply-To: ' . $email;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    // メール送信
    $sent = mail($to, $mailSubject, $mailBody, implode("\r\n", $headers));

    if ($sent) {
        // 成功時のレスポンス
        echo json_encode([
            'success' => true,
            'message' => 'お問い合わせを受け付けました。ご連絡いただきありがとうございます。'
        ]);

        // 添付ファイルの削除（セキュリティのため）
        foreach ($attachments as $attachment) {
            if (file_exists($attachment['file_path'])) {
                unlink($attachment['file_path']);
            }
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'メール送信に失敗しました。しばらく時間をおいて再度お試しください。'
        ]);
    }

} catch (Exception $e) {
    // エラー時のレスポンス
    error_log('Contact form error: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'システムエラーが発生しました。管理者にお問い合わせください。'
    ]);
}

// ファイルサイズをフォーマットする関数
function formatFileSize($bytes) {
    if ($bytes == 0) return '0 Bytes';
    $k = 1024;
    $sizes = ['Bytes', 'KB', 'MB', 'GB'];
    $i = floor(log($bytes) / log($k));
    return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
}
?>
