package com.smallchat.backend.presentation;

import com.smallchat.backend.application.RoomService;
import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.CheckUserDuplicationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<CheckUserDuplicationDto.Response>> checkAccountExists(@PathVariable String accountId) {
//        ApiResponse<CheckUserDuplicationDto.Response> exists = roomService.checkAccountIdExists(accountId);
        return ResponseEntity.ok(new ApiResponse<>(new CheckUserDuplicationDto.Response(true)));
    }
}
