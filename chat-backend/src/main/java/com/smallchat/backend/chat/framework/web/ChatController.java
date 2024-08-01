package com.smallchat.backend.chat.framework.web;

import com.smallchat.backend.chat.application.usecase.CreateChatUseCase;
import com.smallchat.backend.chat.application.usecase.JoinChatUseCase;
import com.smallchat.backend.chat.application.usecase.LeaveChatUseCase;
import com.smallchat.backend.chat.application.usecase.ParticipatingChatsUseCase;
import com.smallchat.backend.chat.framework.web.dto.ChatBasicInfoListDto;
import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.chat.framework.web.dto.JoinChatDto;
import com.smallchat.backend.chat.framework.web.dto.LeaveChatDto;
import com.smallchat.backend.global.framework.web.dto.ApiResponse;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/chats")
public class ChatController {
    private final CreateChatUseCase createChatUseCase;
    private final JoinChatUseCase joinChatUseCase;
    private final LeaveChatUseCase leaveChatUseCase;
    private final ParticipatingChatsUseCase participatingChatsUseCase;

    private final JwtProvider jwtProvider;

    @PostMapping()
    public ResponseEntity<ApiResponse<CreateChatDto.Response>> createChat(@RequestHeader("Authorization") String authorization,
                                                                          @RequestBody CreateChatDto.Request request) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        String chatId = createChatUseCase.createChat(tokenPayload, request);
        return ResponseEntity.status(201).body(new ApiResponse<>(new CreateChatDto.Response(chatId)));
    }

    @PostMapping("/participants")
    public ResponseEntity<ApiResponse<JoinChatDto.Response>> joinChat(@RequestHeader("Authorization") String authorization,
                                                                      @RequestBody JoinChatDto.Request request) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        String chatId = request.chatId();
        joinChatUseCase.join(tokenPayload.userId(), chatId);
        return ResponseEntity.ok(new ApiResponse<>(new JoinChatDto.Response(chatId)));
    }

    @DeleteMapping()
    public ResponseEntity<ApiResponse> leaveChat(@RequestHeader("Authorization") String authorization,
                                                 @RequestBody LeaveChatDto.Request request) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        String chatId = request.chatId();
        leaveChatUseCase.leave(tokenPayload.userId(), chatId);
        return ResponseEntity.ok(new ApiResponse<>(200, "OK"));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<ChatBasicInfoListDto.Response>> getChattingChatList(@RequestHeader("Authorization") String authorization) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        ChatBasicInfoListDto.Response response = participatingChatsUseCase.getChatList(tokenPayload.userId());
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
