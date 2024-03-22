package com.smallchat.auth.data.infra;

import com.smallchat.auth.data.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<Auth, UUID> {
    boolean existsByAccountId(String accountId);

    Optional<Auth> findOneByAccountId(String accountId);
}
