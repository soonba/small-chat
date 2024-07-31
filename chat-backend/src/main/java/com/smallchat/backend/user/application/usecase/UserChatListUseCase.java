package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.domain.model.ParticipatingChat;

import java.util.List;
import java.util.UUID;

public interface UserChatListUseCase {
    List<ParticipatingChat> getUserJoinedChats(UUID userId);
}
