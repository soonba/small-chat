package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Tokens;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthInputPort implements AuthUseCase {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public LoginDto.Response login(LoginDto.Request request) {
        V2User v2User = userOutputPort.loadUserById(new LoginId(request.id()));
        v2User.getPassword().verifying(request.password());
        Tokens tokens = jwtProvider.createTokens(v2User.getUserId(), v2User.getNickname());
        return new LoginDto.Response(tokens);
    }
}
