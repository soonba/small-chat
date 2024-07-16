package com.smallchat.backend.user.framework.web.dto;

public class CheckUserDuplicationDto {
    public record Response(Boolean isUsed) {
    }
}
