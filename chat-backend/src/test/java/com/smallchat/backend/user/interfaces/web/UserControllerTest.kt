package com.smallchat.backend.user.interfaces.web


import com.fasterxml.jackson.databind.ObjectMapper
import com.smallchat.backend.user.interfaces.web.dto.CreateUserDto
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
    fun `회원가입 성공`() {
        // given
        val request = CreateUserDto.Request(
            id = "testUser123",
            nickname = "테스트유저",
            password = "password123"
        )

        val body = objectMapper.writeValueAsString(request)

        // when + then
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
}