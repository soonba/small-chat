package com.smallchat.backend.user.infrastructure.database.jpa_adapter;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.RefreshToken;
import com.smallchat.backend.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter implements UserOutputPort {

    private final UserJpaRepository userJpaRepository;
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;

    @Override
    public void validateRefreshToken(String id, String rt) {
        RefreshToken refreshToken = refreshTokenJpaRepository.findById(id).orElseThrow(RuntimeException::new);
        refreshToken.verifying(rt);
    }

    @Override
    public void saveRefreshToken(String id, String rt) {
        RefreshToken refreshToken = new RefreshToken(id, rt);
        refreshTokenJpaRepository.save(refreshToken);
    }

    @Override
    public boolean isExistID(String loginId) {
        return userJpaRepository.existsByLoginId(loginId);
    }

    @Override
    public User loadUser(String userId) {
        return userJpaRepository.findById(userId).orElseThrow(RuntimeException::new);
    }

    @Override
    public User createUser(User user) {
        if (isExistID(user.getLoginId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        return this.saveUser(user);
    }

    @Override
    public User saveUser(User user) {
        return userJpaRepository.save(user);
    }

    @Override
    public User loadUserById(String loginId) {
        return userJpaRepository.findByLoginId(loginId).orElseThrow(RuntimeException::new);
    }

    @Override
    public void deleteRefreshToken(String userId) {
        refreshTokenJpaRepository.deleteById(userId);
    }
}
