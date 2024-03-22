package com.smallchat.backend.data.infra;

import com.smallchat.backend.data.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<Auth, UUID> {
    boolean existsByAccountId(String accountId);

    Optional<Auth> findOneByAccountId(String accountId);
}
