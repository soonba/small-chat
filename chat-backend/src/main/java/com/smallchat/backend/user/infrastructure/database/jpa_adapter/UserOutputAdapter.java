package com.smallchat.backend.user.infrastructure.database.jpa_adapter;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.interfaces.RefreshTokenRepository;
import com.smallchat.backend.user.domain.interfaces.UserRepository;
import com.smallchat.backend.user.domain.model.RefreshToken;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter implements UserOutputPort {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public void validateRefreshToken(String id, String rt) {
        RefreshToken refreshToken = refreshTokenRepository.findById(id).orElseThrow(RuntimeException::new);
        refreshToken.verifying(rt);
    }

    public void saveRefreshToken(String id, String rt) {
        RefreshToken refreshToken = new RefreshToken(id, rt);
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public boolean isExistID(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    @Override
    public User loadUser(String userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
    }

    public User createUser(User user) {
        if (isExistID(user.getLoginId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        return this.saveUser(user);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Deprecated
    public User loadUserById(String loginId) {
        return new User();
    }

    public void deleteRefreshToken(String userId) {
        refreshTokenRepository.deleteById(userId);
    }
}
