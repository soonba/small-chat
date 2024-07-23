package com.smallchat.backend.room.framework.web;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.room.application.usecase.ChatListUseCase;
import com.smallchat.backend.room.framework.web.dto.ChatListDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/rooms")
public class ChatController {
    private final ChatListUseCase chatListUseCase;
    private final JwtProvider jwtProvider;

    @GetMapping("/{roomId}/chats")
    public ResponseEntity<ChatListDto.Response> getChatHistory(@RequestHeader("Authorization") String authorization, @PathVariable String roomId) {
        jwtProvider.parseFromBearer(authorization);
        ChatListDto.Response chatList = chatListUseCase.getChattingList(UUID.fromString(roomId));
        return ResponseEntity.ok(chatList);
    }
}
