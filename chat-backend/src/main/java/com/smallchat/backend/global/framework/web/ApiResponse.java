package com.smallchat.backend.global.framework.web;

@Deprecated
public class ApiResponse<T> {
    private final int statusCode;
    private final String message;
    private final T data;

    public ApiResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
    }

    public ApiResponse(T data) {
        this.statusCode = 200;
        this.message = "";
        this.data = data;
    }

    public static ApiResponse error(int statusCode, String message) {
        return new ApiResponse(statusCode, message);
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
