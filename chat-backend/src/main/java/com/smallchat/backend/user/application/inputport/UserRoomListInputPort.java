package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.ParticipatingRoomOutputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.UserRoomListUseCase;
import com.smallchat.backend.user.domain.model.ParticipatingRoom;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserRoomListInputPort implements UserRoomListUseCase {
    private final UserOutputPort userOutputPort;
    private final ParticipatingRoomOutputPort participatingRoomOutputPort;

    public List<ParticipatingRoom> getUserJoinedRooms(UUID userId) {
        User user = userOutputPort.loadUser(userId);
        return participatingRoomOutputPort.getParticipatingRooms(user);
    }
}
