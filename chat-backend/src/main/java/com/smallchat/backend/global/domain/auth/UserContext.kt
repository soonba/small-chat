package com.smallchat.backend.global.domain.auth

object UserContext {
    private val holder = ThreadLocal<AuthenticatedUser?>()

    fun set(user: AuthenticatedUser?) = holder.set(user)
    fun get(): AuthenticatedUser? = holder.get()
    fun clear() = holder.remove()
}
