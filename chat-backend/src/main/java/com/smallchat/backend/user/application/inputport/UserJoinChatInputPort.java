package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserJoinChatUseCase;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserJoinChatInputPort implements UserJoinChatUseCase {

    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    @Override
    @Transactional
    public void joinChat(String userId, String chatId) {
        User user = userOutputPort.loadUser(userId);
        List<ParticipatingChat> participatingChats = participatingChatOutputPort.getParticipatingChats(user);
        if (participatingChats.size() >= 5) {
            throw new RuntimeException("참여 가능한 채팅방 개수를 초과하였습니다.");
        }
        participatingChatOutputPort.joinChat(user, chatId);
    }
}
