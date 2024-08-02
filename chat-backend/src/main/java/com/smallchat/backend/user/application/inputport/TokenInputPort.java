package com.smallchat.backend.user.application.inputport;


import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.RefreshDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenInputPort implements TokenUseCase {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public RefreshDto.Response refresh(RefreshDto.Request refreshDto) {
        String rt = refreshDto.refreshToken();
        TokenPayload tokenPayload = jwtProvider.parseToken(rt);

        String id = tokenPayload.userId();
        String nickname = tokenPayload.nickname();
        userOutputPort.validateRefreshToken(id, rt);

        Tokens tokens = jwtProvider.createTokens(id, nickname);
        userOutputPort.saveRefreshToken(id, tokens.refreshToken());

        return new RefreshDto.Response(tokens);
    }

    @Override
    public FetchMeDto.Response fetchMe(TokenPayload tokenPayload) {
        User user = userOutputPort.loadUser(tokenPayload.userId());
        return new FetchMeDto.Response(user.getUserId(), user.getNickname());
    }
}
