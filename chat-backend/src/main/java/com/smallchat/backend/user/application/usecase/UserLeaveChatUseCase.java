package com.smallchat.backend.user.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.ParticipatingChatOutputAdapter;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserLeaveChatUseCase  {

    private final UserOutputAdapter userOutputAdapter;
    private final ParticipatingChatOutputAdapter participatingChatOutputAdapter;

    public void leave(String userId, String chatId) {
        User user = userOutputAdapter.loadUser(userId);
        participatingChatOutputAdapter.leave(user, chatId);
    }
}
