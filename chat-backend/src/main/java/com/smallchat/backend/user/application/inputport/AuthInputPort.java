package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.ID;
import com.smallchat.backend.user.domain.model.vo.Tokens;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import com.smallchat.backend.user.utils.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthInputPort implements AuthUseCase {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public LoginDto.Response login(LoginDto.Request request) {
        V2User v2User = userOutputPort.loadUserById(new ID(request.id()));
        v2User.getPassword().verifying(request.password());
        Token at = jwtProvider.createToken(new TokenPayload(TokenType.ACCESS_TOKEN, v2User.getUserId(), v2User.getNickname()));
        Token rt = jwtProvider.createToken(new TokenPayload(TokenType.REFRESH_TOKEN, v2User.getUserId(), v2User.getNickname()));
        return new LoginDto.Response(new Tokens(at, rt));
    }
}
