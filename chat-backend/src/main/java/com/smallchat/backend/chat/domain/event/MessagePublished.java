package com.smallchat.backend.chat.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MessagePublished {
    private String chatId;
    private String userId;
    private String nickname;
    private String message;
}
