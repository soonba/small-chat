package com.smallchat.backend.user.framework.web.dto;

import com.smallchat.backend.user.domain.model.vo.Nickname;

import java.util.UUID;

public class FetchMeDto {
    public record Response(UUID userId, Nickname nickname) {
    }
}
