package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.ID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserOutputAdapter implements UserOutputPort {
    @Override
    public void validateRefreshToken(UUID id, String rt) {
        
    }

    @Override
    public void saveRefreshToken(UUID id, String rt) {

    }

    @Override
    public boolean isExistID(ID id) {
        return false;
    }

    @Override
    public V2User loadUser(UUID userId) {
        return null;
    }

    @Override
    public V2User saveUser(V2User v2User) {
        return null;
    }
}
