package com.smallchat.backend.presentation;

import com.smallchat.backend.application.RoomService;
import com.smallchat.backend.data.room.Rooms;
import com.smallchat.backend.global.framework.web.dto.ApiResponse;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class V0RoomController {
    private final RoomService roomService;
    private final JwtProvider jwtProvider;

    @GetMapping()
    public ResponseEntity<ApiResponse<Object>> getParticipationRoomList(@RequestHeader("Authorization") String authorization) {
        //todo 토큰 파싱 인터셉터
        String accessToken = authorization.replace("Bearer ", "");
        TokenPayload tokenPayload = jwtProvider.parseToken(accessToken);
        Rooms rooms = roomService.findRoomListByUser(tokenPayload.userId());
        return null;
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
