package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserChatListUseCase;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserChatListInputPort implements UserChatListUseCase {
    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    public List<ParticipatingChat> getUserJoinedChats(UUID userId) {
        User user = userOutputPort.loadUser(userId);
        return participatingChatOutputPort.getParticipatingChats(user);
    }
}
