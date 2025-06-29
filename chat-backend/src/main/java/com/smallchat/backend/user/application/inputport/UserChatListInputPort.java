package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.domain.model.ParticipatingChat;

import java.util.List;

public interface UserChatListInputPort {
    List<ParticipatingChat> getUserJoinedChats(String userId);
}
