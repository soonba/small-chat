package com.smallchat.backend.user.framework.web

import com.smallchat.backend.global.framework.web.dto.ApiResponse
import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.user.application.inputport.AuthInputPort
import com.smallchat.backend.user.application.inputport.CreateUserInputPort
import com.smallchat.backend.user.application.inputport.TokenInputPort
import com.smallchat.backend.user.application.inputport.ValidateUserInputPort
import com.smallchat.backend.user.framework.web.dto.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v2/users")
class UserController(
    private val createUserInputPort: CreateUserInputPort,
    private val tokenInputPort: TokenInputPort,
    private val authInputPort: AuthInputPort,
    private val validateUserInputPort: ValidateUserInputPort,
    private val jwtProvider: JwtProvider
) {
    @PostMapping
    fun join(@RequestBody request: CreateUserDto.Request?): ResponseEntity<ApiResponse<CreateUserDto.Response?>?> {
        val user = createUserInputPort.createUser(request)
        return ResponseEntity.ok<ApiResponse<CreateUserDto.Response?>?>(ApiResponse<CreateUserDto.Response?>(user))
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginDto.Request?): ResponseEntity<ApiResponse<LoginDto.Response?>?> {
        val login = authInputPort.login(request)
        return ResponseEntity.ok<ApiResponse<LoginDto.Response?>?>(ApiResponse<LoginDto.Response?>(login))
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody request: RefreshDto.Request?): ResponseEntity<ApiResponse<RefreshDto.Response?>?> {
        val refresh = tokenInputPort.refresh(request)
        return ResponseEntity.ok<ApiResponse<RefreshDto.Response?>?>(ApiResponse<RefreshDto.Response?>(refresh))
    }

    @GetMapping("/{id}/exists")
    fun validateIDExists(@PathVariable id: String?): ResponseEntity<ApiResponse<CheckUserDuplicationDto.Response?>?> {
        val existId = validateUserInputPort.isExistId(id)
        return ResponseEntity.ok<ApiResponse<CheckUserDuplicationDto.Response?>?>(
            ApiResponse<CheckUserDuplicationDto.Response?>(
                existId
            )
        )
    }

    @GetMapping
    fun fetchMe(@RequestHeader("Authorization") authorization: String): ResponseEntity<ApiResponse<FetchMeDto.Response?>?> {
        val authenticatedUser = jwtProvider.parseFromBearer(authorization)
        val response = tokenInputPort.fetchMe(authenticatedUser)
        return ResponseEntity.ok<ApiResponse<FetchMeDto.Response?>?>(ApiResponse<FetchMeDto.Response?>(response))
    }

    @PostMapping("/logout")
    fun logout(@RequestHeader("Authorization") authorization: String): ResponseEntity<ApiResponse<*>?> {
        val authenticatedUser = jwtProvider.parseFromBearer(authorization)
        this.authInputPort.logout(authenticatedUser)
        return ResponseEntity.ok<ApiResponse<*>?>(ApiResponse<Any?>(200, "OK"))
    }
}
