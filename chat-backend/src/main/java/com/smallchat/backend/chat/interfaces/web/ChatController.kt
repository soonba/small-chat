package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.inputport.JoinChatInputPort
import com.smallchat.backend.chat.application.inputport.LeaveChatInputPort
import com.smallchat.backend.chat.application.inputport.ParticipatingChatsInputPort
import com.smallchat.backend.chat.application.usecase.CreateChatUseCase
import com.smallchat.backend.chat.interfaces.web.dto.*
import com.smallchat.backend.global.framework.web.CurrentUser
import com.smallchat.backend.global.utils.AuthenticatedUser
import com.smallchat.backend.global.utils.JwtProvider
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v2/chats")
class ChatController(
    private val createChatUseCase: CreateChatUseCase,
    private val joinChatUseCase: JoinChatInputPort,
    private val leaveChatUseCase: LeaveChatInputPort,
    private val participatingChatsUseCase: ParticipatingChatsInputPort,
    private val jwtProvider: JwtProvider,
) {
    @PostMapping
    fun createChat(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @RequestBody request: CreateChatDto.Request
    ): CreateChatDto.Response {
        val chatId = createChatUseCase.createChat(authenticatedUser, request)
        return CreateChatDto.Response(chatId)
    }

    @PostMapping("/participants")
    fun joinChat(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @RequestBody request: JoinChatDto.Request
    ): JoinChatDto.Response {
        val userId = authenticatedUser.userId
        joinChatUseCase.join(userId, request.chatId)
        return JoinChatDto.Response(request.chatId)
    }

    @DeleteMapping
    fun leaveChat(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @RequestBody request: LeaveChatDto.Request
    ): Unit {
        val userId = authenticatedUser.userId
        leaveChatUseCase.leave(userId, request.chatId)
        return
    }

    @GetMapping
    fun getParticipatingChats(
        @CurrentUser authenticatedUser: AuthenticatedUser,
    ): ChatBasicInfoListDto.Response {
        val userId = authenticatedUser.userId
        return participatingChatsUseCase.getChatList(userId)
    }

    @GetMapping("/{chatId}")
    fun getChatDetail(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @PathVariable chatId: String
    ): ChatDetail.Response {
        return participatingChatsUseCase.getChatDetail(chatId)
    }
}
