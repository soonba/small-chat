package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;

import java.util.List;

public interface ParticipatingChatOutputPort {
    void joinChat(User user, String chatId);

    void leave(User user, String chatId);

    List<ParticipatingChat> getParticipatingChats(User user);
}
