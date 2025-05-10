package com.smallchat.backend.user.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.jpa_adapter.UserOutputAdapter;
import com.smallchat.backend.user.framework.web.dto.LoginDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthUseCase  {

    private final UserOutputAdapter userOutputAdapter;
    private final JwtProvider jwtProvider;

    public LoginDto.Response login(LoginDto.Request request) {
        User user = userOutputAdapter.loadUserById(request.id());
        user.getPassword().verifying(request.password());
        Tokens tokens = jwtProvider.createTokens(user.getUserId(), user.getNickname());
        userOutputAdapter.saveRefreshToken(user.getUserId(), tokens.refreshToken());
        return new LoginDto.Response(tokens);
    }

    public void logout(TokenPayload request) {
        String userId = request.userId();
        this.userOutputAdapter.deleteRefreshToken(userId);
    }
}
