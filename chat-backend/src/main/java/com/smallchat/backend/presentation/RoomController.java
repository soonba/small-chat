package com.smallchat.backend.presentation;

import com.smallchat.backend.application.RoomService;
import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.CreateRoomDto;
import com.smallchat.backend.data.dto.RoomListDto;
import com.smallchat.backend.data.room.Rooms;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final JwtProvider jwtProvider;

    @GetMapping()
    public ResponseEntity<ApiResponse<RoomListDto.Response>> getParticipationRoomList(@RequestHeader("Authorization") String authorization) {
        //todo 토큰 파싱 인터셉터
        String accessToken = authorization.replace("Bearer ", "");
        TokenPayload tokenPayload = jwtProvider.parseToken(accessToken);
        Rooms rooms = roomService.findRoomListByUser(tokenPayload.userId());
        return ResponseEntity.ok(new ApiResponse<>(new RoomListDto.Response(rooms)));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> createRoom(@RequestHeader("Authorization") String authorization,
                                                          @RequestBody CreateRoomDto.Request request) {
        String accessToken = authorization.replace("Bearer ", "");
        TokenPayload tokenPayload = jwtProvider.parseToken(accessToken);
        roomService.createRoom(tokenPayload.userId(), request);
        return ResponseEntity.status(201).body(new ApiResponse<>("created"));
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<ApiResponse<String>> joinRoom(@RequestHeader("Authorization") String authorization,
                                                        @PathVariable String roomId) {
        String accessToken = authorization.replace("Bearer ", "");
        TokenPayload tokenPayload = jwtProvider.parseToken(accessToken);
        roomService.joinRoom(tokenPayload.userId(), roomId);
        return ResponseEntity.ok(new ApiResponse<>("joined"));
    }
}
