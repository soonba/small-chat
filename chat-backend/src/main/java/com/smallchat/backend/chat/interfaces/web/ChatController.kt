package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.CreateChatUseCase
import com.smallchat.backend.chat.interfaces.web.dto.CreateChatDto
import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import com.smallchat.backend.global.domain.auth.CurrentUser
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v2/chats")
class ChatController(
    private val createChatUseCase: CreateChatUseCase,
) {
    @PostMapping
    fun createChat(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @RequestBody request: CreateChatDto.Request
    ): CreateChatDto.Response {
        val chatId = createChatUseCase.execute(authenticatedUser, request)
        return CreateChatDto.Response(chatId)
    }
}
