package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserJoinRoomUseCase;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.ParticipatingRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserJoinRoomInputPort implements UserJoinRoomUseCase {

    private final UserOutputPort userOutputPort;

    @Override
    public void joinRoom(UUID userId, UUID roomId) {
        User user = userOutputPort.loadUser(userId);
        userOutputPort.saveUser(user.joinParticipatingRoom(new ParticipatingRoom(roomId)));
    }
}
