package com.smallchat.backend.user.application.usecase;


import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.user.application.inputport.TokenInputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.interfaces.web.dto.FetchMeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Deprecated
public class TokenUseCase implements TokenInputPort {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;


    @Override
    public FetchMeDto.Response fetchMe(AuthenticatedUser authenticatedUser) {
        User user = userOutputPort.loadUser(authenticatedUser.getUserId());
        return new FetchMeDto.Response(user.getUserId(), user.getNickname());
    }
}
