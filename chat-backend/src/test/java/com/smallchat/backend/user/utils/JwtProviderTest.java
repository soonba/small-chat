package com.smallchat.backend.user.utils;

import com.smallchat.backend.global.utils.JwtProvider;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.global.utils.TokenType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = {JwtProvider.class})
@TestPropertySource(properties = "auth.key=sample-secret-key-which-is-at-least-256-bits-long")
public class JwtProviderTest {

    @Autowired
    private JwtProvider jwtProvider;

    @Value("${auth.key}")
    private String secretKey;

    @BeforeEach
    public void setUp() {
        assertNotNull(secretKey);
    }

    @Test
    public void testCreateToken() {
        TokenPayload payload = new TokenPayload(TokenType.ACCESS_TOKEN, UUID.randomUUID().toString(), "김철수");
        String token = jwtProvider.createToken(payload);

        assertNotNull(token);
        assertEquals(payload.tokenType(), token);
    }
//
//    @Test
//    public void testParseToken() {
//        UUID userId = UUID.randomUUID();
//        TokenPayload payload = new TokenPayload(TokenType.ACCESS_TOKEN, userId, "김철수");
//        String token = jwtProvider.createToken(payload);
//
//        TokenPayload parsedPayload = jwtProvider.parseToken(token);
//
//        assertEquals(payload.tokenType(), parsedPayload.tokenType());
//        assertEquals(payload.userId(), parsedPayload.userId());
//        assertEquals(payload.nickname().getValue(), parsedPayload.nickname().getValue());
//    }
//
//    @Test
//    public void testParseToken_invalidToken() {
//        String invalidToken = "invalid.token.value";
//
//        assertThrows(RuntimeException.class, () -> jwtProvider.parseToken(invalidToken));
//    }
}
