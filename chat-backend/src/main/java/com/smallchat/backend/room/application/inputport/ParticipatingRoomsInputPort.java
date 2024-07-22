package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.room.application.usecase.ParticipatingRoomsUseCase;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.domain.model.vo.Chat;
import com.smallchat.backend.room.framework.web.dto.RoomBasicInfoListDto;
import com.smallchat.backend.user.application.usecase.UserRoomListUseCase;
import com.smallchat.backend.user.domain.model.ParticipatingRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipatingRoomsInputPort implements ParticipatingRoomsUseCase {

    private final UserRoomListUseCase userRoomListUseCase;
    private final LastChatMessageUseCase lastChatMessageUseCase;
    private final RoomOutputPort roomOutputPort;

    @Override
    @Transactional
    public RoomBasicInfoListDto.Response getChattingRoomList(UUID userId) {
        List<ParticipatingRoom> userJoinedRooms = userRoomListUseCase.getUserJoinedRooms(userId);
        List<UUID> userJoinedRoomIdList = userJoinedRooms.stream().map(ParticipatingRoom::getRoomId).toList();

        List<Room> roomList = roomOutputPort.findRoomBasicByIds(userJoinedRoomIdList);
        List<Chat> lastMessageList = lastChatMessageUseCase.getLastMessageListByRoomIdList(userJoinedRoomIdList);

        return new RoomBasicInfoListDto.Response(roomList.stream().map(el -> el.toRoomBasicInfo(lastMessageList)).toList());
    }
}
