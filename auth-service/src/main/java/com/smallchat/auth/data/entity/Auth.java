package com.smallchat.auth.data.entity;

import com.smallchat.auth.data.dto.JoinDto;
import jakarta.persistence.*;
import java.util.UUID;

@Table(name = "auth")
@Entity
public class Auth extends BaseTime {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private String userId;

  @Column(name = "nickname", nullable = false)
  private String nickname;

  @Column(name = "password", nullable = false)
  private String password;

  public Auth(String userId, String nickname, String password) {
    this.userId = userId;
    this.nickname = nickname;
    this.password = password;
  }

  protected Auth() {}

  public static Auth fromDto(JoinDto.Request request) {
    return new Auth(request.userId(), request.nickname(), request.password());
  }

  public UUID getId() {
    return id;
  }

  public String getUserId() {
    return userId;
  }

  public String getNickname() {
    return nickname;
  }

  public String getPassword() {
    return password;
  }
}
