package com.smallchat.backend.data.dto;

public class CheckUserDuplicationDto {
    public record Response(Boolean isUsed) {
    }
}
