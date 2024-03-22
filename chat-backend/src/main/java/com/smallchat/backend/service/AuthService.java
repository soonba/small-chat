package com.smallchat.backend.service;

import com.smallchat.backend.data.dto.*;
import com.smallchat.backend.data.entity.Auth;
import com.smallchat.backend.data.entity.User;
import com.smallchat.backend.data.infra.AuthRepository;
import com.smallchat.backend.data.infra.UserRepository;
import com.smallchat.backend.data.jwt.JwtPayload;
import com.smallchat.backend.data.jwt.Tokens;
import com.smallchat.backend.util.PasswordUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    public AuthService(AuthRepository authRepository, UserRepository userRepository, TokenService tokenService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    public ApiResponse<JoinDto.Response> join(JoinDto.Request request) {
        if (authRepository.existsByAccountId(request.accountId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        User savedUser = userRepository.save(new User(request.nickname()));
        Auth auth = authRepository.save(Auth.fromUserAndDto(savedUser, request));
        Tokens tokens = tokenService.generateTokensByAuth(auth);
        return new ApiResponse<>(new JoinDto.Response(tokens));
    }

    @Transactional
    public ApiResponse<LoginDto.Response> login(LoginDto.Request request) {
        Auth auth =
                authRepository
                        .findOneByAccountId(request.accountId())
                        .orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        PasswordUtil.verifying(request.password(), auth.getPassword());
        Tokens tokens = tokenService.generateTokensByAuth(auth);
        return new ApiResponse<>(new LoginDto.Response(tokens));
    }

    @Transactional
    public ApiResponse<RefreshDto.Response> refresh(RefreshDto.Request request) {
        String rt = request.refreshToken();
        JwtPayload jwtPayload = tokenService.compile(rt);
        Auth auth = authRepository.findById(jwtPayload.id()).orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        Tokens tokens = tokenService.generateTokensByAuth(auth);
        return new ApiResponse<>(new RefreshDto.Response(tokens));
    }

    public ApiResponse<CheckUserResponse> checkAccountIdExists(String accountId) {
        return new ApiResponse<>(new CheckUserResponse(authRepository.existsByAccountId(accountId)));
    }
}
