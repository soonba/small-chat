package com.smallchat.backend.user.interfaces.web

import com.smallchat.backend.global.framework.web.CurrentUser
import com.smallchat.backend.global.utils.AuthenticatedUser
import com.smallchat.backend.user.application.usecase.CreateUserUseCase
import com.smallchat.backend.user.application.usecase.LoginUseCase
import com.smallchat.backend.user.application.usecase.RefreshTokenUseCase
import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.interfaces.web.dto.*
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v2/users")
class UserController(
    private val createUserUseCase: CreateUserUseCase,
    private val loginUseCase: LoginUseCase,
    private val refreshTokenUseCase: RefreshTokenUseCase,

    private val userRepository: UserRepository,
    private val refreshRepository: RefreshRepository,
) {

    @PostMapping
    fun join(@RequestBody request: CreateUserDto.Request): CreateUserDto.Response {
        return createUserUseCase.execute(request)
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginDto.Request): LoginDto.Response {
        return loginUseCase.execute(request)
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody request: RefreshDto.Request): RefreshDto.Response {
        return refreshTokenUseCase.execute(request)
    }

    @GetMapping("/{id}/exists")
    fun validateIDExists(@PathVariable id: String): CheckUserDuplicationDto.Response {
        val isUsed = userRepository.isExistByLoginId(id)
        return CheckUserDuplicationDto.Response(isUsed)
    }

    @GetMapping
    fun fetchMe(@CurrentUser authUser: AuthenticatedUser): FetchMeDto.Response {
        val (userId, nickname) = authUser
        return FetchMeDto.Response(userId, nickname)
    }

    @PostMapping("/logout")
    fun logout(@CurrentUser authUser: AuthenticatedUser): Unit {
        refreshRepository.deleteById(authUser.userId)
    }
}
