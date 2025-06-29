package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.application.inputport.UserLeaveChatInputPort;
import com.smallchat.backend.user.application.outputport.ParticipatingChatOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLeaveChatUseCase implements UserLeaveChatInputPort {

    private final UserOutputPort userOutputPort;
    private final ParticipatingChatOutputPort participatingChatOutputPort;

    @Override
    public void leave(String userId, String chatId) {
        User user = userOutputPort.loadUser(userId);
        participatingChatOutputPort.leave(user, chatId);
    }
}
