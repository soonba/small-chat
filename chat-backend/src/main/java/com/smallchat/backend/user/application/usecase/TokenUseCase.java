package com.smallchat.backend.user.application.usecase;


import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.inputport.TokenInputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.interfaces.web.dto.FetchMeDto;
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenUseCase implements TokenInputPort {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;

    @Override
    public RefreshDto.Response refresh(RefreshDto.Request refreshDto) {
        String rt = refreshDto.refreshToken();
        AuthenticatedUser authenticatedUser = jwtProvider.parseToken(rt);

        String id = authenticatedUser.getUserId();
        String nickname = authenticatedUser.getNickname();
        userOutputPort.validateRefreshToken(id, rt);

        Tokens tokens = jwtProvider.createTokens(id, nickname);
        userOutputPort.saveRefreshToken(id, tokens.refreshToken());

        return new RefreshDto.Response(tokens);
    }

    @Override
    public FetchMeDto.Response fetchMe(AuthenticatedUser authenticatedUser) {
        User user = userOutputPort.loadUser(authenticatedUser.getUserId());
        return new FetchMeDto.Response(user.getUserId(), user.getNickname());
    }
}
