//package com.smallchat.backend.user.application.inputport;
//
//import com.smallchat.backend.global.utils.JwtProvider;
//import com.smallchat.backend.global.utils.TokenPayload;
//import com.smallchat.backend.user.application.outputport.UserOutputPort;
//import com.smallchat.backend.user.domain.model.User;
//import com.smallchat.backend.user.domain.model.vo.LoginId;
//import com.smallchat.backend.user.domain.model.vo.Password;
//import com.smallchat.backend.user.framework.web.dto.LoginDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class AuthInputPortTest {
//
//    @Mock
//    private UserOutputPort userOutputPort;
//
//    @Mock
//    private JwtProvider jwtProvider;
//
//    @InjectMocks
//    private AuthInputPort authInputPort;
//
//    private User user;
//    private String accessToken;
//    private String refreshToken;
//
//    @BeforeEach
//    public void setUp() {
//        // 설정하는 부분
//        user = mock(User.class);
//        when(user.getUserId()).thenReturn(UUID.randomUUID());
//        when(user.getNickname()).thenReturn("abcde");
//
//        Password password = mock(Password.class);
//        when(user.getPassword()).thenReturn(password);
//
//        accessToken = "at";
//        refreshToken = "rt";
//
//        when(jwtProvider.createToken(any(TokenPayload.class))).thenReturn(accessToken, refreshToken);
//    }
//
//    @Test
//    public void testLogin_Success() {
//        // given
//        LoginDto.Request request = new LoginDto.Request("1234", "password");
//
//        when(userOutputPort.loadUserById(new LoginId(request.id()))).thenReturn(user);
//
////        doNothing().when(v2User.getPassword()).verifying(request.password());
//
//        // when
//        LoginDto.Response response = authInputPort.login(request);
//
//        // then
//        assertNotNull(response);
//        assertEquals(accessToken, response.tokens().accessToken());
//        assertEquals(refreshToken, response.tokens().refreshToken());
//
//        verify(userOutputPort).loadUserById(new LoginId(request.id()));
//        verify(user.getPassword()).verifying(request.password());
//        verify(jwtProvider).createToken(any(TokenPayload.class));
//    }
//
//    @Test
//    public void testLogin_Failure_InvalidPassword() {
//        // given
//        LoginDto.Request request = new LoginDto.Request("1234", "wrongPassword");
//
//        when(userOutputPort.loadUserById(new LoginId(request.id()))).thenReturn(user);
//
////        doThrow(new RuntimeException("Invalid password")).when(v2User.getPassword()).verifying(request.password());
//
//        // when & then
//        assertThrows(RuntimeException.class, () -> authInputPort.login(request));
//
//        verify(userOutputPort).loadUserById(new LoginId(request.id()));
//        verify(user.getPassword()).verifying(request.password());
//        verify(jwtProvider, never()).createToken(any(TokenPayload.class));
//    }
//}
