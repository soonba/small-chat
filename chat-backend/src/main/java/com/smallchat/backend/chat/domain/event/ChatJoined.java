package com.smallchat.backend.chat.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatJoined implements Serializable {
    private String userId;
    private String chatId;
}
