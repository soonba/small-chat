package com.smallchat.backend.chat.framework.web.dto;

import java.util.List;

public class MessageListDto {
    public record Response(List<MessageBasicInfo> messageBasicInfoList, Long nextCursor) {
    }
}
