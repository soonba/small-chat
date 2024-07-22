package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.ParticipatingRoom;
import com.smallchat.backend.user.domain.model.User;

import java.util.List;
import java.util.UUID;

public interface ParticipatingRoomOutputPort {
    void joinRoom(User user, UUID roomId);

    List<ParticipatingRoom> getParticipatingRooms(User user);
}
