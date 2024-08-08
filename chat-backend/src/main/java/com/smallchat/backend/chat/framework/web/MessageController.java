package com.smallchat.backend.chat.framework.web;

import com.smallchat.backend.chat.application.usecase.MessageListUseCase;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;
import com.smallchat.backend.global.framework.web.dto.ApiResponse;
import com.smallchat.backend.global.utils.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/chats")
public class MessageController {
    private final MessageListUseCase messageListUseCase;
    private final JwtProvider jwtProvider;

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<ApiResponse<MessageListDto.Response>> getMessageList(@RequestHeader("Authorization") String authorization, @PathVariable String chatId, @RequestParam(value = "nextCursor", required = false) Long nextCursor) {
        jwtProvider.parseFromBearer(authorization);
        MessageListDto.Response messageList = messageListUseCase.getMessageList(chatId, nextCursor);
        return ResponseEntity.ok(new ApiResponse<>(messageList));
    }
}
