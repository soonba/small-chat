package com.smallchat.backend.room.framework.web.dto;

import java.util.List;

public class MessageListDto {
    public record Response(List<MessageBasicInfo> messageBasicInfoList) {
    }
}
