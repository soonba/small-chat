package com.smallchat.auth.controller;

import com.smallchat.auth.data.dto.JoinDto;
import com.smallchat.auth.data.dto.LoginDto;
import com.smallchat.auth.data.dto.RefreshDto;
import com.smallchat.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/join")
    public ResponseEntity<JoinDto.Response> join(@RequestBody JoinDto.Request request) {
        JoinDto.Response response = authService.join(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDto.Response> login(@RequestBody LoginDto.Request request) {
        LoginDto.Response response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshDto.Response> refresh(@RequestBody RefreshDto.Request request) {
        RefreshDto.Response response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }
}
