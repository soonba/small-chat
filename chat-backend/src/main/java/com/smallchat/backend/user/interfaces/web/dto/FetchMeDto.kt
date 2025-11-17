package com.smallchat.backend.user.interfaces.web.dto;

public class FetchMeDto {
    public record Response(String userId, String nickname) {
    }
}
