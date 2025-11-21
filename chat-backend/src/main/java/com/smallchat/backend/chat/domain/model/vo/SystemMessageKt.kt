package com.smallchat.backend.chat.domain.model.vo

object SystemMessageKt {
    const val SYSTEM_ID = "system"
    const val SYSTEM_NICKNAME = "system"

    fun userJoined(nickname: String): String =
        "$nickname 님이 참가하였습니다."

    fun userLeft(nickname: String): String =
        "$nickname 님이 방을 나갔습니다."

    fun chatCreated(): String =
        "방이 생성되었습니다."
}
