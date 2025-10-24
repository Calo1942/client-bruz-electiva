<?php

namespace BruzDeporte\Helpers;

trait ApiResponse {
    public static function success($message, $data = null, $code = 200) {
        http_response_code($code);
        echo json_encode([
            'status' => 'success',
            'code' => $code,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }

    public static function error($message, $data = null, $code = 400) {
        http_response_code($code);
        echo json_encode([
            'status' => 'error',
            'code' => $code,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }
}