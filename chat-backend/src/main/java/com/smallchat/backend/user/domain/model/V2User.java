package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.domain.BaseTime;
import com.smallchat.backend.user.domain.model.vo.ID;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@Table(name = "tb_v2_user")
@Entity
public class V2User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Embedded
    private Nickname nickname;

    @Embedded
    private ID id;

    @Embedded
    private Password password;

    public V2User(Nickname nickname, ID id, Password password) {
        this.nickname = nickname;
        this.id = id;
        this.password = password;
    }

    public static V2User createUser(Nickname nickname, ID id, Password password) {
        return new V2User(nickname, id, password);
    }
}
