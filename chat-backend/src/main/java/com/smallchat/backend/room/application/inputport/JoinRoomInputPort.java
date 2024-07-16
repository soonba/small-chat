package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.JoinRoomUseCase;
import com.smallchat.backend.room.domain.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JoinRoomInputPort implements JoinRoomUseCase {

    private final RoomOutputPort roomOutputPort;

    @Override
    public void join(UUID userId, UUID roomId) {
        Room loadedRoom = roomOutputPort.load(roomId);
        Room room = loadedRoom.addParticipant(userId);
        roomOutputPort.save(room);
    }
}
