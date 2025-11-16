package com.smallchat.backend.user.interfaces.web


import com.fasterxml.jackson.databind.ObjectMapper
import com.smallchat.backend.user.interfaces.web.dto.CreateUserDto
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
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
    @Autowired val objectMapper: ObjectMapper
) {

    @Test
    fun `로그인 성공`() {
        // 1. 회원가입
        val joinRequest = CreateUserDto.Request(
            id = "loginTestUser",
            nickname = "로그인유저",
            password = "password123"
        )
        val joinBody = objectMapper.writeValueAsString(joinRequest)

        mockMvc.post("/api/v2/users") {
            contentType = MediaType.APPLICATION_JSON
            content = joinBody
        }.andExpect {
            status { isOk() }
        }

        // 2. 로그인 요청
        val loginRequest = LoginDto.Request(
            id = "loginTestUser",
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

}