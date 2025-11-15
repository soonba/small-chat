package com.smallchat.backend.user.interfaces.web.dto;

public class CheckUserDuplicationDto {
    public record Response(Boolean isUsed) {
    }
}
