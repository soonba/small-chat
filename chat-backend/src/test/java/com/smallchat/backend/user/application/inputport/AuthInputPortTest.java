package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.user.application.outputport.UserOutputPort;
import com.smallchat.backend.user.domain.model.V2User;
import com.smallchat.backend.user.domain.model.vo.LoginId;
import com.smallchat.backend.user.domain.model.vo.Nickname;
import com.smallchat.backend.user.domain.model.vo.Password;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import com.smallchat.backend.user.utils.JwtProvider;
import com.smallchat.backend.user.utils.Token;
import com.smallchat.backend.user.utils.TokenPayload;
import com.smallchat.backend.user.utils.TokenType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthInputPortTest {

    @Mock
    private UserOutputPort userOutputPort;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthInputPort authInputPort;

    private V2User v2User;
    private Token accessToken;
    private Token refreshToken;

    @BeforeEach
    public void setUp() {
        // 설정하는 부분
        v2User = mock(V2User.class);
        when(v2User.getUserId()).thenReturn(UUID.randomUUID());
        when(v2User.getNickname()).thenReturn(Nickname.sample());

        Password password = mock(Password.class);
        when(v2User.getPassword()).thenReturn(password);

        accessToken = new Token("accessToken", TokenType.ACCESS_TOKEN);
        refreshToken = new Token("refreshToken", TokenType.REFRESH_TOKEN);

        when(jwtProvider.createToken(any(TokenPayload.class))).thenReturn(accessToken, refreshToken);
    }

    @Test
    public void testLogin_Success() {
        // given
        LoginDto.Request request = new LoginDto.Request("1234", "password");

        when(userOutputPort.loadUserById(new LoginId(request.id()))).thenReturn(v2User);

//        doNothing().when(v2User.getPassword()).verifying(request.password());

        // when
        LoginDto.Response response = authInputPort.login(request);

        // then
        assertNotNull(response);
        assertEquals(accessToken, response.tokens().accessToken());
        assertEquals(refreshToken, response.tokens().refreshToken());

        verify(userOutputPort).loadUserById(new LoginId(request.id()));
        verify(v2User.getPassword()).verifying(request.password());
        verify(jwtProvider).createToken(any(TokenPayload.class));
    }

    @Test
    public void testLogin_Failure_InvalidPassword() {
        // given
        LoginDto.Request request = new LoginDto.Request("1234", "wrongPassword");

        when(userOutputPort.loadUserById(new LoginId(request.id()))).thenReturn(v2User);

//        doThrow(new RuntimeException("Invalid password")).when(v2User.getPassword()).verifying(request.password());

        // when & then
        assertThrows(RuntimeException.class, () -> authInputPort.login(request));

        verify(userOutputPort).loadUserById(new LoginId(request.id()));
        verify(v2User.getPassword()).verifying(request.password());
        verify(jwtProvider, never()).createToken(any(TokenPayload.class));
    }
}
