package com.smallchat.backend.presentation;

import com.smallchat.backend.application.RoomService;
import com.smallchat.backend.application.TokenService;
import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.CreateRoomDto;
import com.smallchat.backend.data.dto.RoomListDto;
import com.smallchat.backend.data.jwt.JwtPayload;
import com.smallchat.backend.data.room.Rooms;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;
    private final TokenService tokenService;

    public RoomController(RoomService roomService, TokenService tokenService) {
        this.roomService = roomService;
        this.tokenService = tokenService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<RoomListDto.Response>> getParticipationRoomList(@RequestHeader("Authorization") String authorization) {
        //todo 토큰 파싱 인터셉터
        String accessToken = authorization.replace("Bearer ", "");
        JwtPayload jwtPayload = tokenService.compile(accessToken);
        Rooms rooms = roomService.findRoomListByUser(jwtPayload.userId());
        return ResponseEntity.ok(new ApiResponse<>(new RoomListDto.Response(rooms)));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<String>> createRoom(@RequestHeader("Authorization") String authorization,
                                                          @RequestBody CreateRoomDto.Request request) {
        String accessToken = authorization.replace("Bearer ", "");
        JwtPayload jwtPayload = tokenService.compile(accessToken);
        roomService.createRoom(jwtPayload.userId(), request);
        return ResponseEntity.status(201).body(new ApiResponse<>("created"));
    }
}
