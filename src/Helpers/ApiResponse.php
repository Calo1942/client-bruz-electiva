<?php

namespace BruzDeporte\Helpers;

trait ApiResponse {
    public static function success($code = 200, $message, $data = null) {
        return [
            'success' => true,
            'code' => $code,
            'message' => $message,
            'data' => $data
        ];
        exit;
    }

    public static function error($code = 400, $message, $error = null) {
        return [
            'success' => false,
            'code' => $code,
            'message' => $message,
            'error' => $error
        ];
        exit;
    }
}