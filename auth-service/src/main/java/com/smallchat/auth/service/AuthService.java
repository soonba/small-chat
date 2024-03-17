package com.smallchat.auth.service;

import com.smallchat.auth.data.dto.JoinDto;
import com.smallchat.auth.data.dto.LoginDto;
import com.smallchat.auth.data.entity.Auth;
import com.smallchat.auth.data.infra.AuthRepository;
import com.smallchat.auth.data.jwt.JwtProcessor;
import com.smallchat.auth.data.jwt.Token;
import com.smallchat.auth.util.PasswordUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final TokenService tokenService;
    private final JwtProcessor jwtProcessor;

    public AuthService(AuthRepository authRepository, TokenService tokenService, JwtProcessor jwtProcessor) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
        this.jwtProcessor = jwtProcessor;
    }

    @Transactional
    public JoinDto.Response join(JoinDto.Request request) {
        if (authRepository.existsByUserId(request.userId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        Auth save = authRepository.save(Auth.fromDto(request));
        Token token = jwtProcessor.generateByAuth(save);
        return new JoinDto.Response(token);
    }

    @Transactional
    public LoginDto.Response login(LoginDto.Request request) {
        Auth auth =
                authRepository
                        .findOneByUserId(request.userId())
                        .orElseThrow(() -> new RuntimeException("찾을 수 없는 아이디"));
        if (!PasswordUtil.verifying(auth.getPassword())) {
            throw new RuntimeException("비밀번호 불일치");
        }
        Token token = jwtProcessor.generateByAuth(auth);
        return new LoginDto.Response(token);
    }
}
