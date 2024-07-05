package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface V2UserRepository extends JpaRepository<V2User, UUID> {

    Optional<V2User> findByLoginId(LoginId loginId);

    Boolean existsByLoginId(LoginId loginId);
}
