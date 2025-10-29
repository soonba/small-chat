package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.inputport.CreateChatInputPort
import com.smallchat.backend.chat.application.inputport.JoinChatInputPort
import com.smallchat.backend.chat.application.inputport.LeaveChatInputPort
import com.smallchat.backend.chat.application.inputport.ParticipatingChatsInputPort
import com.smallchat.backend.chat.interfaces.web.dto.*
import com.smallchat.backend.global.framework.web.dto.ApiResponse
import com.smallchat.backend.global.utils.JwtProvider
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v2/chats")
class ChatController(
    private val createChatUseCase: CreateChatInputPort,
    private val joinChatUseCase: JoinChatInputPort,
    private val leaveChatUseCase: LeaveChatInputPort,
    private val participatingChatsUseCase: ParticipatingChatsInputPort,
    private val jwtProvider: JwtProvider,
) {

    // ====== 헬퍼 메서드 ======
    private fun extractUserId(authorization: String): String =
        jwtProvider.parseFromBearer(authorization).userId

    // ====== 엔드포인트 ======

    @GetMapping("/mytest")
    fun test() {
        println("테스트 엔드포인트 호출됨")
    }

    @PostMapping
    fun createChat(
        @RequestHeader("Authorization") authorization: String,
        @RequestBody request: CreateChatDto.Request
    ): ResponseEntity<ApiResponse<CreateChatDto.Response>> {
        val payload = jwtProvider.parseFromBearer(authorization)
        val chatId = createChatUseCase.createChat(payload, request)
        return ResponseEntity
            .status(201)
            .body(ApiResponse(CreateChatDto.Response(chatId)))
    }

    @PostMapping("/participants")
    fun joinChat(
        @RequestHeader("Authorization") authorization: String,
        @RequestBody request: JoinChatDto.Request
    ): ResponseEntity<ApiResponse<JoinChatDto.Response>> {
        val userId = extractUserId(authorization)
        joinChatUseCase.join(userId, request.chatId)
        return ResponseEntity.ok(ApiResponse(JoinChatDto.Response(request.chatId)))
    }

    @DeleteMapping
    fun leaveChat(
        @RequestHeader("Authorization") authorization: String,
        @RequestBody request: LeaveChatDto.Request
    ): ResponseEntity<ApiResponse<Unit>> {
        val userId = extractUserId(authorization)
        leaveChatUseCase.leave(userId, request.chatId)
        return ResponseEntity.ok(ApiResponse(200, "OK"))
    }

    @GetMapping
    fun getParticipatingChats(
        @RequestHeader("Authorization") authorization: String
    ): ResponseEntity<ApiResponse<ChatBasicInfoListDto.Response>> {
        val userId = extractUserId(authorization)
        val response = participatingChatsUseCase.getChatList(userId)
        return ResponseEntity.ok(ApiResponse(response))
    }

    @GetMapping("/{chatId}")
    fun getChatDetail(
        @RequestHeader("Authorization") authorization: String,
        @PathVariable chatId: String
    ): ResponseEntity<ApiResponse<ChatDetail.Response>> {
        jwtProvider.parseFromBearer(authorization) // 단순 인증 검증용
        val response = participatingChatsUseCase.getChatDetail(chatId)
        return ResponseEntity.ok(ApiResponse(response))
    }
}
