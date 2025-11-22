package com.smallchat.backend.chat.interfaces.web.dto;

import com.smallchat.backend.chat.domain.model.MessageKt;

import java.util.List;

public class MessageListDto {
    public record Response(List<MessageKt> data, Long nextCursor) {
    }
}
