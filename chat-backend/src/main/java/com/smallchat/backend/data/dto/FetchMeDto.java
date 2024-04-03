package com.smallchat.backend.data.dto;

import java.util.UUID;

public class FetchMeDto {
    public record Response(UUID userId, String nickname) {
    }
}
