package com.smallchat.backend.data.dto;

public class ApiResponse<T> {
    private final int statusCode;
    private final String message;
    private final T data;

    public ApiResponse(int statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(T data) {
        this.statusCode = 200;
        this.message = "";
        this.data = data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
