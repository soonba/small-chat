package com.smallchat.backend.presentation;

import com.smallchat.backend.application.TokenService;
import com.smallchat.backend.application.UserService;
import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.FetchMeDto;
import com.smallchat.backend.data.jwt.JwtPayload;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;

    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<FetchMeDto.Response>> fetchMe(@RequestHeader("Authorization") String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        JwtPayload jwtPayload = tokenService.compile(accessToken);
        return ResponseEntity.ok(new ApiResponse<>(new FetchMeDto.Response(jwtPayload.userId(), jwtPayload.nickname())));
    }
}
