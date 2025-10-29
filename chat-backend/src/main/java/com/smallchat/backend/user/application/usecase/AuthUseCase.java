package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.inputport.AuthInputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthUseCase implements AuthInputPort {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public LoginDto.Response login(LoginDto.Request request) {
        User user = userOutputPort.loadUserById(request.id());
        user.getPassword().verifying(request.password());
        Tokens tokens = jwtProvider.createTokens(user.getUserId(), user.getNickname());
        userOutputPort.saveRefreshToken(user.getUserId(), tokens.refreshToken());
        return new LoginDto.Response(tokens);
    }

    @Override
    public void logout(AuthenticatedUser request) {
        String userId = request.getUserId();
        this.userOutputPort.deleteRefreshToken(userId);
    }
}
