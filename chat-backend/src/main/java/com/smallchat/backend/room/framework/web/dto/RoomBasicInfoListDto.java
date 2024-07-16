package com.smallchat.backend.room.framework.web.dto;

import java.util.List;

public class RoomBasicInfoListDto {

    public record Response(List<RoomBasicInfo> roomBasicInfos) {
    }

}
