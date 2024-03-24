package com.smallchat.backend.presentation;

import com.smallchat.backend.application.RoomService;
import com.smallchat.backend.application.TokenService;
import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.RoomListDto;
import com.smallchat.backend.data.jwt.JwtPayload;
import com.smallchat.backend.data.room.Rooms;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<ApiResponse<RoomListDto.Response>> getParticipationRoomList(@RequestHeader("Authorization") String accessToken) {
        JwtPayload jwtPayload = tokenService.compile(accessToken);
        Rooms rooms = roomService.findRoomListByUser(jwtPayload.id());
        return ResponseEntity.ok(new ApiResponse<>(new RoomListDto.Response(rooms)));
    }
}
