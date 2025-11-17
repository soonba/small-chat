package com.smallchat.backend.user.application.inputport;

public interface ValidateUserInputPort {
    void hasReachedMaxChatLimit(String userId);
}
