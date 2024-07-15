package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.room.application.outputport.EventOutputPort;
import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.CreateRoomUseCase;
import com.smallchat.backend.room.domain.event.RoomJoined;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.domain.model.vo.Owner;
import com.smallchat.backend.room.framework.web.dto.CreateRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateRoomInputPort implements CreateRoomUseCase {

    private final RoomOutputPort roomOutputPort;
    private final EventOutputPort eventOutputPort;

    @Override
    public void createRoom(TokenPayload tokenPayload, CreateRoomDto.Request request) {
        Room room = Room.createRoom(Owner.of(tokenPayload.userId()), request.roomName());
        roomOutputPort.save(room);
        try {
            eventOutputPort.occurCreateRoomEvent(new RoomJoined(tokenPayload.userId(), room.getRoomId()));
        } catch (Exception e) {
            throw new RuntimeException("이벤트 발행 실패");
        }
    }
}
