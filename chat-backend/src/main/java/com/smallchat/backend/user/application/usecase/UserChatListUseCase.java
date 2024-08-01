package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.domain.model.ParticipatingChat;

import java.util.List;

public interface UserChatListUseCase {
    List<ParticipatingChat> getUserJoinedChats(String userId);
}
