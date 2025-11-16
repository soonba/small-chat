package com.smallchat.backend.user.domain.model

import com.smallchat.backend.global.framework.jpa.BaseTime
import com.smallchat.backend.user.domain.model.vo.Password
import jakarta.persistence.*

@Table(name = "tb_user")
@Entity
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    val userId: String? = null,

    @Column(name = "nickname", nullable = false)
    val nickname: String = "",

    @Column(name = "login_id", nullable = false)
    val loginId: String = "",

    @Embedded
    val password: Password = Password()

) : BaseTime() {
    
    val userIdOrThrow: String
        get() = userId ?: throw IllegalStateException("User ID is not assigned yet.")

}
