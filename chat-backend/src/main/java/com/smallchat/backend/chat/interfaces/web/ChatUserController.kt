package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.usecase.JoinChatUseCase
import com.smallchat.backend.chat.application.usecase.LeaveChatUseCase
import com.smallchat.backend.chat.application.usecase.ParticipatingChatsUseCase
import com.smallchat.backend.chat.interfaces.web.dto.ChatBasicInfoListDto
import com.smallchat.backend.chat.interfaces.web.dto.ChatDetail
import com.smallchat.backend.chat.interfaces.web.dto.JoinChatDto
import com.smallchat.backend.chat.interfaces.web.dto.LeaveChatDto
import com.smallchat.backend.global.infrastructure.web.CurrentUser
import com.smallchat.backend.global.utils.AuthenticatedUser
import org.springframework.web.bind.annotation.*

// todo: endpoint 수정
@RestController
@RequestMapping("/api/v2/chats")
class ChatUserController(
    private val joinChatUseCase: JoinChatUseCase,
    private val leaveChatUseCase: LeaveChatUseCase,
    private val participatingChatsUseCase: ParticipatingChatsUseCase,
) {
    @PostMapping("/participants")
    fun joinChat(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @RequestBody request: JoinChatDto.Request
    ): JoinChatDto.Response {
        joinChatUseCase.join(authenticatedUser, request.chatId)
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