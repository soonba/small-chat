package com.smallchat.backend.data.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "tb_user")
@Entity
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    @Column(name = "nickname", nullable = false)
    private String nickname;

    public User(String nickname) {
        this.nickname = nickname;
    }

    public User() {
    }

    public UUID getUserId() {
        return userId;
    }

    public String getNickname() {
        return nickname;
    }
}
