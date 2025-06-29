package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.Tokens;
import com.smallchat.backend.user.application.inputport.CreateUserInputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.Password;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateUserUseCase implements CreateUserInputPort {

    private final JwtProvider jwtProvider;
    private final UserOutputPort userOutputPort;

    @Override
    @Transactional
    public CreateUserDto.Response createUser(CreateUserDto.Request request) {
        String id = request.id();
        Password encrypt = Password.encrypt(request.password());
        String nickname = request.nickname();

        User savedUser = userOutputPort.createUser(User.of(nickname, id, encrypt));

        Tokens tokens = jwtProvider.createTokens(savedUser.getUserId(), savedUser.getNickname());
        userOutputPort.saveRefreshToken(savedUser.getUserId(), tokens.refreshToken());
        return new CreateUserDto.Response(tokens);
    }
}
