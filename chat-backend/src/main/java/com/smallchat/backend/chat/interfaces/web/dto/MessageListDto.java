package com.smallchat.backend.chat.interfaces.web.dto;

import com.smallchat.backend.chat.domain.model.Message;

import java.util.List;

public class MessageListDto {
    public record Response(List<Message> data, Long nextCursor) {
    }
}
