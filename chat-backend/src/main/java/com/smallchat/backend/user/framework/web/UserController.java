package com.smallchat.backend.user.framework.web;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smallchat.backend.global.framework.web.dto.ApiResponse;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import com.smallchat.backend.user.application.usecase.CreateUserUseCase;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import com.smallchat.backend.user.framework.web.dto.CheckUserDuplicationDto;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/users")
public class UserController {
    private final CreateUserUseCase createUserUseCase;
    private final TokenUseCase tokenUseCase;
    private final AuthUseCase authUseCase;
    private final ValidateUserUseCase validateUserUseCase;
    private final JwtProvider jwtProvider;

    @PostMapping()
    public ResponseEntity<ApiResponse<CreateUserDto.Response>> join(@RequestBody CreateUserDto.Request request) {
        CreateUserDto.Response user = createUserUseCase.createUser(request);
        return ResponseEntity.ok(new ApiResponse<>(user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginDto.Response>> login(@RequestBody LoginDto.Request request) {
        LoginDto.Response login = authUseCase.login(request);
        return ResponseEntity.ok(new ApiResponse<>(login));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<RefreshDto.Response>> refresh(@RequestBody RefreshDto.Request request) {
        RefreshDto.Response refresh = tokenUseCase.refresh(request);
        return ResponseEntity.ok(new ApiResponse<>(refresh));
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<ApiResponse<CheckUserDuplicationDto.Response>> validateIDExists(@PathVariable String id) {
        CheckUserDuplicationDto.Response existId = validateUserUseCase.isExistId(id);
        return ResponseEntity.ok(new ApiResponse<>(existId));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<FetchMeDto.Response>> fetchMe(@RequestHeader("Authorization") String authorization) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        FetchMeDto.Response response = tokenUseCase.fetchMe(tokenPayload);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@RequestHeader("Authorization") String authorization) {
        TokenPayload tokenPayload = jwtProvider.parseFromBearer(authorization);
        this.authUseCase.logout(tokenPayload);
        return ResponseEntity.ok(new ApiResponse<>(200, "OK"));
    }

}
