package com.smallchat.backend.room.framework.web;

import com.smallchat.backend.global.framework.web.dto.ApiResponse;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.room.application.usecase.CreateRoomUseCase;
import com.smallchat.backend.room.application.usecase.JoinRoomUseCase;
import com.smallchat.backend.room.application.usecase.ParticipatingRoomsUseCase;
import com.smallchat.backend.room.framework.web.dto.CreateRoomDto;
import com.smallchat.backend.room.framework.web.dto.JoinRoomDto;
import com.smallchat.backend.room.framework.web.dto.RoomBasicInfoListDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/rooms")
public class RoomController {
    private final CreateRoomUseCase createRoomUseCase;
    private final JoinRoomUseCase joinRoomUseCase;
    private final ParticipatingRoomsUseCase participatingRoomsUseCase;

    private final JwtProvider jwtProvider;

    @PostMapping()
    public ResponseEntity<ApiResponse<UUID>> createRoom(@RequestHeader("Authorization") String authorization,
                                                        @RequestBody CreateRoomDto.Request request) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        UUID roomId = createRoomUseCase.createRoom(tokenPayload, request);
        //todo roomId
        return ResponseEntity.status(201).body(new ApiResponse<>(roomId));
    }

    @PostMapping("/participants")
    public ResponseEntity<ApiResponse<String>> joinRoom(@RequestHeader("Authorization") String authorization,
                                                        @RequestBody JoinRoomDto.Request request) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        joinRoomUseCase.join(tokenPayload.userId(), UUID.fromString(request.roomId()));
        return ResponseEntity.ok(new ApiResponse<>("joined"));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<RoomBasicInfoListDto.Response>> getChattingRoomList(@RequestHeader("Authorization") String authorization) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        RoomBasicInfoListDto.Response response = participatingRoomsUseCase.getChattingRoomList(tokenPayload.userId());
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
