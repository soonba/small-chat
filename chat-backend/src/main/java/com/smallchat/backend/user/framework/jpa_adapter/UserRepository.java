package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByLoginId(LoginId loginId);

    Boolean existsByLoginId(LoginId loginId);
}
