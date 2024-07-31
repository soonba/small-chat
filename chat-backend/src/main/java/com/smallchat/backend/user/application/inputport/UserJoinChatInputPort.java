package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserJoinChatUseCase;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserJoinChatInputPort implements UserJoinChatUseCase {

    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    @Override
    @Transactional
    public void joinChat(UUID userId, UUID chatId) {
        User user = userOutputPort.loadUser(userId);
        participatingChatOutputPort.joinChat(user, chatId);
    }
}
