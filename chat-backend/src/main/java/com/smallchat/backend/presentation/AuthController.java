package com.smallchat.backend.presentation;

import com.smallchat.backend.application.AuthService;
import com.smallchat.backend.data.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<JoinDto.Response>> join(@RequestBody JoinDto.Request request) {
        ApiResponse<JoinDto.Response> response = authService.join(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginDto.Response>> login(@RequestBody LoginDto.Request request) {
        ApiResponse<LoginDto.Response> response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<RefreshDto.Response>> refresh(@RequestBody RefreshDto.Request request) {
        ApiResponse<RefreshDto.Response> response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{accountId}/exists")
    public ResponseEntity<ApiResponse<CheckUserDuplicationDto.Response>> checkAccountExists(@PathVariable String accountId) {
        ApiResponse<CheckUserDuplicationDto.Response> exists = authService.checkAccountIdExists(accountId);
        return ResponseEntity.ok(exists);
    }
}
