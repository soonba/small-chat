package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.EventOutputPort;
import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.JoinRoomUseCase;
import com.smallchat.backend.room.domain.event.RoomJoined;
import com.smallchat.backend.room.domain.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JoinRoomInputPort implements JoinRoomUseCase {

    private final RoomOutputPort roomOutputPort;
    private final EventOutputPort eventOutputPort;

    @Override
    @Transactional
    public void join(UUID userId, UUID roomId) {
        Room loadedRoom = roomOutputPort.load(roomId);
        Room room = loadedRoom.addParticipant(userId);
        roomOutputPort.save(room);
        try {
            eventOutputPort.occurJoinRoomEvent(new RoomJoined(userId, roomId));
        } catch (Exception e) {
            throw new RuntimeException("이벤트 발행 실패");
        }
    }
}
