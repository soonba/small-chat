package com.smallchat.backend.user.framework.web.dto;

public class FetchMeDto {
    public record Response(String userId, String nickname) {
    }
}
