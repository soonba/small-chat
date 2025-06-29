package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.application.inputport.UserChatListInputPort;
import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingChat;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserChatListUseCase implements UserChatListInputPort {
    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    public List<ParticipatingChat> getUserJoinedChats(String userId) {
        User user = userOutputPort.loadUser(userId);
        return participatingChatOutputPort.getParticipatingChats(user);
    }
}
