package com.smallchat.backend.user.framework.database.jpa_adapter;

import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<User, String> {

    Optional<User> findByLoginId(String loginId);

    Boolean existsByLoginId(String loginId);
}
