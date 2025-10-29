package com.smallchat.backend.chat.interfaces.web.dto;

import java.util.List;

public class MessageListDto {
    public record Response(List<MessageBasicInfo> data, Long nextCursor) {
    }
}
