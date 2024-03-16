package com.smallchat.auth.data.infra;

import com.smallchat.auth.data.entity.Auth;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Auth, String> {
  Optional<Auth> findOneByUserId(String id);

  boolean existsByUserId(String id);
}
