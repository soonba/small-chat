package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthInputPort implements AuthUseCase {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public LoginDto.Response login(LoginDto.Request request) {
        User user = userOutputPort.loadUserById(request.id());
        user.getPassword().verifying(request.password());
        Tokens tokens = jwtProvider.createTokens(user.getUserId(), user.getNickname());
        return new LoginDto.Response(tokens);
    }
}
