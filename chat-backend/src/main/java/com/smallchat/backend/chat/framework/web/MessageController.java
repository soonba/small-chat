package com.smallchat.backend.chat.framework.web;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.chat.application.usecase.MessageListUseCase;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/messages")
public class MessageController {
    private final MessageListUseCase messageListUseCase;
    private final JwtProvider jwtProvider;

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<MessageListDto.Response> getMessageList(@RequestHeader("Authorization") String authorization, @PathVariable String chatId) {
        jwtProvider.parseFromBearer(authorization);
        MessageListDto.Response messageList = messageListUseCase.getMessageList(UUID.fromString(chatId));
        return ResponseEntity.ok(messageList);
    }
}