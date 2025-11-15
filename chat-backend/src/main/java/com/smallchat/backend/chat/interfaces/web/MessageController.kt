package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.inputport.MessageListInputPort
import com.smallchat.backend.chat.interfaces.web.dto.MessageListDto
import com.smallchat.backend.global.framework.web.ApiResponse
import com.smallchat.backend.global.utils.JwtProvider
import lombok.AllArgsConstructor
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/chats")
class MessageController(
    private val messageListUseCase: MessageListInputPort,
    private val jwtProvider: JwtProvider
) {

    @GetMapping("/{chatId}/messages")
    fun getMessageList(
        @RequestHeader("Authorization") authorization: String,
        @PathVariable chatId: String?,
        @RequestParam(value = "nextCursor", required = false) nextCursor: Long?
    ): ResponseEntity<ApiResponse<MessageListDto.Response?>?> {
        jwtProvider!!.parseFromBearer(authorization)
        val messageList = messageListUseCase!!.getMessageList(chatId, nextCursor)
        return ResponseEntity.ok<ApiResponse<MessageListDto.Response?>?>(
            ApiResponse<MessageListDto.Response?>(
                messageList
            )
        )
    }
}
