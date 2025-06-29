package com.smallchat.backend.chat.framework.web;

import com.smallchat.backend.chat.application.inputport.CreateChatInputPort;
import com.smallchat.backend.chat.application.inputport.JoinChatInputPort;
import com.smallchat.backend.chat.application.inputport.LeaveChatInputPort;
import com.smallchat.backend.chat.application.inputport.ParticipatingChatsInputPort;
import com.smallchat.backend.chat.framework.web.dto.*;
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
    private final CreateChatInputPort createChatUseCase;
    private final JoinChatInputPort joinChatUseCase;
    private final LeaveChatInputPort leaveChatUseCase;
    private final ParticipatingChatsInputPort participatingChatsUseCase;

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

    @GetMapping("/{chatId}")
    public ResponseEntity<ApiResponse<ChatDetail.Response>> getChattingChatList(@RequestHeader("Authorization") String authorization, @PathVariable String chatId) {
        jwtProvider.parseFromBearer(authorization);
        ChatDetail.Response response = participatingChatsUseCase.getChatDetail(chatId);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
