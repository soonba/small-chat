package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.RefreshToken;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter implements UserOutputPort {

    private final V2UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void validateRefreshToken(UUID id, String rt) {
        RefreshToken refreshToken = refreshTokenRepository.findById(id).orElseThrow(RuntimeException::new);
        refreshToken.verifying(rt);
    }

    @Override
    public void saveRefreshToken(UUID id, String rt) {
        RefreshToken refreshToken = new RefreshToken(id, rt);
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public boolean isExistID(LoginId loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    @Override
    public V2User loadUser(UUID userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
    }

    @Override
    public V2User saveUser(V2User v2User) {
        if (isExistID(v2User.getLoginId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        return userRepository.save(v2User);
    }

    @Override
    public V2User loadUserById(LoginId loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(RuntimeException::new);
    }
}
