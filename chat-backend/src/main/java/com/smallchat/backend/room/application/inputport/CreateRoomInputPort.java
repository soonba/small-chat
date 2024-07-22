package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.outputport.EventOutputPort;
import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.CreateRoomUseCase;
import com.smallchat.backend.room.domain.event.RoomJoined;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.framework.web.dto.CreateRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateRoomInputPort implements CreateRoomUseCase {

    private final RoomOutputPort roomOutputPort;
    private final EventOutputPort eventOutputPort;
    private final ChatOutputPort chatOutputPort;

    @Override
    public UUID createRoom(TokenPayload tokenPayload, CreateRoomDto.Request request) {
        Room room = Room.createRoom(tokenPayload.userId(), request.roomName());
        UUID roomId = roomOutputPort.save(room).getRoomId();
        //todo
//        chatOutputPort.save(new Chat());
        try {
            eventOutputPort.occurJoinRoomEvent(new RoomJoined(tokenPayload.userId(), roomId));
        } catch (Exception e) {
            throw new RuntimeException("이벤트 발행 실패");
        }
        return roomId;
    }
}
