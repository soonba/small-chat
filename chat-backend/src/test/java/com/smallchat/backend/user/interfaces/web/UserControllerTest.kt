package com.smallchat.backend.user.interfaces.web


import com.fasterxml.jackson.databind.ObjectMapper
import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.interfaces.web.dto.CreateUserDto
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
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
}
