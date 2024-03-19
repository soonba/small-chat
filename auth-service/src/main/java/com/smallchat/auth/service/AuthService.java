package com.smallchat.auth.service;

import com.smallchat.auth.data.dto.ApiResponse;
import com.smallchat.auth.data.dto.JoinDto;
import com.smallchat.auth.data.dto.LoginDto;
import com.smallchat.auth.data.dto.RefreshDto;
import com.smallchat.auth.data.entity.Auth;
import com.smallchat.auth.data.infra.AuthRepository;
import com.smallchat.auth.data.jwt.JwtProcessor;
import com.smallchat.auth.data.jwt.Tokens;
import com.smallchat.auth.util.PasswordUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final TokenService tokenService;
    private final JwtProcessor jwtProcessor;

    public AuthService(AuthRepository authRepository, TokenService tokenService,
        JwtProcessor jwtProcessor) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
        this.jwtProcessor = jwtProcessor;
    }

    @Transactional
    public ApiResponse<JoinDto.Response> join(JoinDto.Request request) {
        if (authRepository.existsByUserId(request.userId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        Auth save = authRepository.save(Auth.fromDto(request));
        Tokens tokens = jwtProcessor.generateByAuth(save);
        tokenService.saveRefreshToken(save.getId(), tokens.refreshToken());
        return new ApiResponse<>(new JoinDto.Response(tokens));
    }

    @Transactional
    public ApiResponse<LoginDto.Response> login(LoginDto.Request request) {
        Auth auth =
            authRepository
                .findOneByUserId(request.userId())
                .orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        PasswordUtil.verifying(request.password(), auth.getPassword());
        Tokens tokens = jwtProcessor.generateByAuth(auth);
        return new ApiResponse<>( new LoginDto.Response(tokens));
    }

    @Transactional
    public ApiResponse<RefreshDto.Response> refresh(RefreshDto.Request request) {
        String rt = request.rt();
        jwtProcessor.compile(rt);
        return new ApiResponse<>( new RefreshDto.Response(new Tokens("at", "rt")));
    }
}
