package com.smallchat.backend.room.framework.web.dto;

import java.util.List;

public class ChatListDto {
    public record Response(List<ChatBasicInfo> chatBasicInfoList) {
    }
}
