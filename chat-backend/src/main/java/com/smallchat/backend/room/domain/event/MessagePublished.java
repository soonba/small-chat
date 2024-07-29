package com.smallchat.backend.room.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MessagePublished {
    private UUID roomId;
    private UUID userId;
    private String nickname;
    private String message;
}
