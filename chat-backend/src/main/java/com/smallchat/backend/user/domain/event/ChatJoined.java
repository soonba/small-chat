package com.smallchat.backend.user.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatJoined implements Serializable {
    private UUID userId;
    private UUID chatId;
}