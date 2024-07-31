package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByLoginId(String loginId);

    Boolean existsByLoginId(String loginId);
}
