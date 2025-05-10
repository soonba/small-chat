package com.smallchat.backend.user.framework.jpa_adapter;

import org.springframework.stereotype.Repository;

import com.smallchat.backend.user.domain.model.RefreshToken;
import com.smallchat.backend.user.domain.model.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter  {

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

    public boolean isExistID(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public User loadUser(String userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
    }

    public User createUser(User user) {
        if (isExistID(user.getLoginId())) {
            throw new RuntimeException("이미 존재하는 아이디");
        }
        return this.saveUser(user);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User loadUserById(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(RuntimeException::new);
    }

    public void deleteRefreshToken(String userId) {
        refreshTokenRepository.deleteById(userId);
    }
}
