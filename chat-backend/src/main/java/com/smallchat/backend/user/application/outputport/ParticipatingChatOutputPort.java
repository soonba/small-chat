package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;

import java.util.List;
import java.util.UUID;

public interface ParticipatingChatOutputPort {
    void joinChat(User user, UUID chatId);

    List<ParticipatingChat> getParticipatingChats(User user);
}
