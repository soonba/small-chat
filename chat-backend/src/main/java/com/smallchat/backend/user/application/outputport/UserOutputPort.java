package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.ID;

import java.util.UUID;

public interface UserOutputPort {

    V2User loadUser(UUID userId);

    V2User saveUser(V2User v2User);

    boolean isExistID(ID id);
}
