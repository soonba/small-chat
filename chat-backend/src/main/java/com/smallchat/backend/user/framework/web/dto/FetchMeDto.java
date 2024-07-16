package com.smallchat.backend.user.framework.web.dto;

import java.util.UUID;

public class FetchMeDto {
    public record Response(UUID userId, String nickname) {
    }
}
