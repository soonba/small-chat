package com.smallchat.backend.chat.interfaces.web

import com.smallchat.backend.chat.application.MessageListUseCase
import com.smallchat.backend.chat.interfaces.web.dto.MessageListDto
import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import com.smallchat.backend.global.domain.auth.CurrentUser
import lombok.AllArgsConstructor
import org.springframework.web.bind.annotation.*

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/chats")
class MessageController(
    private val messageListUseCase: MessageListUseCase,
) {

    @GetMapping("/{chatId}/messages")
    fun getMessageList(
        @CurrentUser authenticatedUser: AuthenticatedUser,
        @PathVariable chatId: String,
        @RequestParam(value = "nextCursor", required = false) nextCursor: Long?
    ): MessageListDto.Response {
        return messageListUseCase.execute(chatId, nextCursor)
    }
}
