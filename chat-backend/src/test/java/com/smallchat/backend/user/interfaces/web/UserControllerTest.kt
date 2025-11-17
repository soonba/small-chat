package com.smallchat.backend.user.interfaces.web


import com.fasterxml.jackson.databind.ObjectMapper
import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.domain.model.vo.Password
import com.smallchat.backend.user.interfaces.web.dto.CreateUserDto
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper,
    @Autowired val userRepository: UserRepository,
    @Autowired val refreshRepository: RefreshRepository,
    @Autowired val jwtProvider: JwtProvider
) {

    @Test
    fun `회원가입 성공`() {
        val request = CreateUserDto.Request(
            id = "joinUser",
            nickname = "회원가입유저",
            password = "password123"
        )

        val body = objectMapper.writeValueAsString(request)

        mockMvc.post("/api/v2/users") {
            contentType = MediaType.APPLICATION_JSON
            content = body
        }
            .andExpect {
                status { isOk() }
                jsonPath("$.data.tokens.accessToken") { exists() }
                jsonPath("$.data.tokens.refreshToken") { exists() }
            }
    }


    @Test
    fun `로그인 성공`() {
        // 준비 — 회원가입(DB에 저장됨 → 트랜잭션 격리 처리)
        val joinRequest = CreateUserDto.Request(
            id = "loginUser",
            nickname = "로그인유저",
            password = "password123"
        )
        val joinBody = objectMapper.writeValueAsString(joinRequest)

        mockMvc.post("/api/v2/users") {
            contentType = MediaType.APPLICATION_JSON
            content = joinBody
        }.andExpect { status { isOk() } }

        // 실행 — 로그인
        val loginRequest = LoginDto.Request(
            id = "loginUser",
            password = "password123"
        )
        val loginBody = objectMapper.writeValueAsString(loginRequest)

        mockMvc.post("/api/v2/users/login") {
            contentType = MediaType.APPLICATION_JSON
            content = loginBody
        }
            .andExpect {
                status { isOk() }
                jsonPath("$.data.tokens.accessToken") { exists() }
                jsonPath("$.data.tokens.refreshToken") { exists() }
            }
    }


    @Test
    fun `refresh 성공`() {
        // 준비 — 회원가입
        val req = CreateUserDto.Request(
            id = "refreshUser",
            nickname = "리프레시유저",
            password = "password123"
        )
        val body = objectMapper.writeValueAsString(req)

        val result = mockMvc.post("/api/v2/users") {
            contentType = MediaType.APPLICATION_JSON
            content = body
        }
            .andExpect { status { isOk() } }
            .andReturn()

        // 가입 시 내려온 refreshToken 추출
        val json = result.response.contentAsString
        val root = objectMapper.readTree(json)
        val refreshToken = root["data"]["tokens"]["refreshToken"].asText()

        // 실행 — refresh 요청
        val refreshReq = RefreshDto.Request(refreshToken)
        val refreshBody = objectMapper.writeValueAsString(refreshReq)

        println(refreshToken)
        println(refreshReq)
        println(refreshBody)

        mockMvc.post("/api/v2/users/refresh") {
            contentType = MediaType.APPLICATION_JSON
            content = refreshBody
        }
            .andExpect {
                status { isOk() }
                jsonPath("$.data.tokens.accessToken") { exists() }
                jsonPath("$.data.tokens.refreshToken") { exists() }
            }
    }


    @Test
    fun `아이디 중복체크 - 이미 존재`() {
        // given
        val user = userRepository.save(
            User(
                loginId = "dupUser",
                nickname = "Duplicated",
                password = Password("password123")
            )
        )

        // when & then
        mockMvc.get("/api/v2/users/${user.loginId}/exists")
            .andExpect {
                status { isOk() }
                jsonPath("$.data.used") { value(true) }
            }
    }

    @Test
    fun `아이디 중복체크 - 존재하지 않음`() {
        mockMvc.get("/api/v2/users/notExistUser/exists")
            .andExpect {
                status { isOk() }
                jsonPath("$.data.used") { value(false) }
            }
    }

    @Test
    fun `내 정보 조회 성공`() {
        // given: 테스트용 유저 생성
        val saved = userRepository.save(
            User(
                loginId = "meUser",
                nickname = "나유저",
                password = Password("password123")
            )
        )

        // JWT 생성
        val accessToken = jwtProvider.createTokens(saved.userId!!, saved.nickname).accessToken

        // when & then
        mockMvc.get("/api/v2/users") {
            header("Authorization", "Bearer $accessToken")
        }.andExpect {
            status { isOk() }
            jsonPath("$.data.userId") { value(saved.userId) }
            jsonPath("$.data.nickname") { value(saved.nickname) }
        }
    }

    @Test
    fun `로그아웃 성공`() {
        // given: 유저 + refresh token 생성
        val saved = userRepository.save(
            User(
                loginId = "logoutUser",
                nickname = "로그아웃유저",
                password = Password("password123")
            )
        )

        // JWT 생성
        val id = saved.userId!!
        requireNotNull(id) { "UserId must not be null" }
        val createTokens = jwtProvider.createTokens(id, saved.nickname)
        val refreshToken = createTokens.refreshToken
        val accessToken = createTokens.accessToken

        refreshRepository.save(id, refreshToken)

        // when
        mockMvc.post("/api/v2/users/logout") {
            header("Authorization", "Bearer $accessToken")
        }.andExpect {
            status { isOk() }
        }

        assertThrows<RuntimeException> {
            refreshRepository.findByIdOrElseThrow(id)
        }
    }
}
