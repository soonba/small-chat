package com.smallchat.backend.user.framework.web;


import com.smallchat.backend.data.dto.ApiResponse;
import com.smallchat.backend.data.dto.CheckUserDuplicationDto;
import com.smallchat.backend.data.dto.RefreshDto;
import com.smallchat.backend.user.application.usecase.AuthUseCase;
import com.smallchat.backend.user.application.usecase.CreateUserUseCase;
import com.smallchat.backend.user.application.usecase.TokenUseCase;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import com.smallchat.backend.user.framework.web.dto.CreateUserDto;
import com.smallchat.backend.user.framework.web.dto.FetchMeDto;
import com.smallchat.backend.user.framework.web.dto.LoginDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v2/users")
public class V2UserController {
    private final CreateUserUseCase createUserUseCase;
    private final TokenUseCase tokenUseCase;
    private final AuthUseCase authUseCase;
    private final ValidateUserUseCase validateUserUseCase;

    @PostMapping()
    public ResponseEntity<ApiResponse<CreateUserDto.Response>> join(@RequestBody CreateUserDto.Request request) {
        CreateUserDto.Response user = createUserUseCase.createUser(request);
        return ResponseEntity.ok(new ApiResponse<>(user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginDto.Response>> login(@RequestBody LoginDto.Request request) {
        LoginDto.Response login = authUseCase.login(request);
        return ResponseEntity.ok(new ApiResponse<>(login));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<RefreshDto.Response>> refresh(@RequestBody RefreshDto.Request request) {
        RefreshDto.Response refresh = tokenUseCase.refresh(request);
        return ResponseEntity.ok(new ApiResponse<>(refresh));
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<ApiResponse<CheckUserDuplicationDto.Response>> validateIDExists(@PathVariable String id) {
        CheckUserDuplicationDto.Response existId = validateUserUseCase.isExistId(id);
        return ResponseEntity.ok(new ApiResponse<>(existId));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<FetchMeDto.Response>> fetchMe(@RequestHeader("Authorization") String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        FetchMeDto.Response response = tokenUseCase.fetchMe(accessToken);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
