package com.smallchat.backend.domain;

import com.smallchat.backend.data.dto.JoinDto;
import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "tb_auth")
@Entity
public class Auth extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "auth_id", nullable = false)
    private UUID authId;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "account_id", nullable = false)
    private String accountId;
    @Column(name = "password", nullable = false)
    private String password;

    public Auth(User user, String accountId, String password) {
        this.user = user;
        this.accountId = accountId;
        this.password = password;
    }

    protected Auth() {
    }

    public static Auth fromUserAndDto(User user, JoinDto.Request request) {
        return new Auth(user, request.accountId(), request.password());
    }

    public UUID getAuthId() {
        return authId;
    }

    public User getUser() {
        return user;
    }

    public String getAccountId() {
        return accountId;
    }

    public String getPassword() {
        return password;
    }
}
