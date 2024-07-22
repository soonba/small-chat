package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.ParticipatingRoomOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingRoom;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ParticipatingRoomOutputAdapter implements ParticipatingRoomOutputPort {

    private final ParticipatingRoomRepository participatingRoomRepository;

    @Override
    public void joinRoom(User user, UUID roomId) {
        participatingRoomRepository.save(new ParticipatingRoom(user, roomId));
    }

    @Override
    public List<ParticipatingRoom> getParticipatingRooms(User user) {
        return participatingRoomRepository.findByUser(user);
    }
}
