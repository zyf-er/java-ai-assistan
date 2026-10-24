
package com.itheima.javaaiassistan.controller;

import com.itheima.javaaiassistan.common.ApiResponse;
import com.itheima.javaaiassistan.dto.ChatRequest;
import com.itheima.javaaiassistan.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assistant")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public ApiResponse<String> chat(
            @Valid @RequestBody ChatRequest request) {

        String answer = chatService.chat(request.message());

        return ApiResponse.success(answer);
    }
}
