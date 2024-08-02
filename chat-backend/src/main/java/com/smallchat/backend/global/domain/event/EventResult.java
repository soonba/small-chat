package com.smallchat.backend.global.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EventResult implements Serializable {
    private EventType eventType;
    private String chatId;
    private String userId;
    private boolean isSucceed;

    public static EventResult createFailEventResult(EventType eventType, String chatId, String userId) {
        return new EventResult(eventType, chatId, userId, false);
    }
}
