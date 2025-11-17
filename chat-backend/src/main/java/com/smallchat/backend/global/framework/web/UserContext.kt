package com.smallchat.backend.global.framework.web

import com.smallchat.backend.global.utils.AuthenticatedUser

object UserContext {
    private val holder = ThreadLocal<AuthenticatedUser?>()

    fun set(user: AuthenticatedUser?) = holder.set(user)
    fun get(): AuthenticatedUser? = holder.get()
    fun clear() = holder.remove()
}
