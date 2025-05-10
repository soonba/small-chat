package com.smallchat.backend.user.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.ParticipatingChatOutputAdapter;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserJoinChatUseCase {

    private final UserOutputAdapter userOutputAdapter;
    private final ParticipatingChatOutputAdapter participatingChatOutputAdapter;

    @Transactional
    public void joinChat(String userId, String chatId) {
        User user = userOutputAdapter.loadUser(userId);
        List<ParticipatingChat> participatingChats = participatingChatOutputAdapter.getParticipatingChats(user);
        if (participatingChats.size() >= 5) {
            throw new RuntimeException("참여 가능한 채팅방 개수를 초과하였습니다.");
        }
        participatingChatOutputAdapter.joinChat(user, chatId);
    }
}
