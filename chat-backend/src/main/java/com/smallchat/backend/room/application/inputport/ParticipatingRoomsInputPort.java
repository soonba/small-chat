package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.ParticipatingRoomsUseCase;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.framework.web.dto.RoomBasicInfoListDto;
import com.smallchat.backend.user.application.inputport.UserRoomListInputPort;
import com.smallchat.backend.user.domain.model.ParticipatingRooms;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipatingRoomsInputPort implements ParticipatingRoomsUseCase {

    private final UserRoomListInputPort userRoomListInputPort;
    //    private final
    private final RoomOutputPort roomOutputPort;

    @Override
    @Transactional
    public RoomBasicInfoListDto.Response getParticipationRoomList(UUID userId) {
        ParticipatingRooms participatingRooms = userRoomListInputPort.getUserJoinedRooms(userId);
        List<Room> byIds = roomOutputPort.findByIds(participatingRooms.getRoomList());
        return new RoomBasicInfoListDto.Response(byIds.stream().map(Room::toRoomBasicInfo).toList());
    }
}
