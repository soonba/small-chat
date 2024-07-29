package com.smallchat.backend.chat.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MessagePublished {
    private UUID chatId;
    private UUID userId;
    private String nickname;
    private String message;
}
