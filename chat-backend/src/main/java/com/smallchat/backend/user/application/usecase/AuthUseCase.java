package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.global.utils.AuthenticatedUser;
import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.user.application.inputport.AuthInputPort;
import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.infrastructure.BcryptPasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthUseCase implements AuthInputPort {

    private final UserOutputPort userOutputPort;
    private final JwtProvider jwtProvider;
    private final BcryptPasswordEncoder passwordEncoder;

    @Override
    public void logout(AuthenticatedUser request) {
        String userId = request.getUserId();
        this.userOutputPort.deleteRefreshToken(userId);
    }
}
