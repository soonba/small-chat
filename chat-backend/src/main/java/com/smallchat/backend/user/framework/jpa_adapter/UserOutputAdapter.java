package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.ParticipatingRooms;
import com.smallchat.backend.user.domain.model.RefreshToken;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter implements UserOutputPort {

    private final UserRepository userRepository;
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
    public User loadUser(UUID userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
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
        return userRepository.save(user);
    }

    @Override
    public User loadUserById(LoginId loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(RuntimeException::new);
    }

    @Override
    public ParticipatingRooms getParticipatingRooms(UUID userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new).getParticipatingRooms();
    }
}
