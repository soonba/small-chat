package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.V2User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface V2UserRepository extends JpaRepository<V2User, UUID> {
}
