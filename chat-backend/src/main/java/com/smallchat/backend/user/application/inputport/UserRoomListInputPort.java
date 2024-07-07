package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingRooms;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserRoomListInputPort {
    private final UserOutputPort userOutputPort;

    public ParticipatingRooms getUserJoinedRooms(UUID userId) {
        return userOutputPort.getParticipatingRooms(userId);
    }
}
