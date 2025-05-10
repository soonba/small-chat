package com.smallchat.backend.user.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.ParticipatingChatOutputAdapter;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserChatListUseCase  {
    private final UserOutputAdapter userOutputAdapter;
    private final ParticipatingChatOutputAdapter participatingChatOutputAdapter;

    public List<ParticipatingChat> getUserJoinedChats(String userId) {
        User user = userOutputAdapter.loadUser(userId);
        return participatingChatOutputAdapter.getParticipatingChats(user);
    }
}
