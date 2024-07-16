package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserJoinRoomUseCase;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserJoinRoomInputPort implements UserJoinRoomUseCase {

    private final UserOutputPort userOutputPort;

    @Transactional
    @Override
    public void joinRoom(UUID userId, UUID roomId) {
        User user = userOutputPort.loadUser(userId);
        userOutputPort.saveUser(user.joinParticipatingRoom(roomId));
    }
}