package com.smallchat.backend.chat.domain.model.vo;

public enum SystemMessage {
    USER_JOINED("님이 참가하였습니다."),
    USER_LEFT("님이 방을 나갔습니다."),
    CHAT_CREATED("방이 생성되었습니다.");

    SystemMessage(String systemMessage) {
        this.systemMessage = systemMessage;
    }

    private final String systemMessage;

    public String getSystemMessage(String value) {
        return value + systemMessage;
    }
}
